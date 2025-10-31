const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');

let mainWindow;
let model = null;
let context = null;
let session = null;
let LlamaModel, LlamaContext, LlamaChatSession;

// Model paths
const MODEL_DIR = path.join(app.getPath('userData'), 'models');
const MODEL_PATH = path.join(MODEL_DIR, 'phi-3-mini.gguf');
const MODEL_URL = 'https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-gguf/resolve/main/Phi-3-mini-4k-instruct-q4.gguf';

// Ensure model directory exists
if (!fs.existsSync(MODEL_DIR)) {
  fs.mkdirSync(MODEL_DIR, { recursive: true });
}

// Check if model is valid (exists and has reasonable size)
function isModelValid() {
  try {
    if (!fs.existsSync(MODEL_PATH)) {
      return false;
    }
    const stats = fs.statSync(MODEL_PATH);
    // Model should be at least 100MB to be valid
    return stats.size > 100 * 1024 * 1024;
  } catch (error) {
    console.error('Error checking model:', error);
    return false;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, 'logo.png')
  });

  // Check if model is valid
  if (isModelValid()) {
    // Model exists and is valid, load main app immediately
    mainWindow.loadFile('index.html');

    // Initialize llama.cpp AFTER window loads, using setImmediate to ensure non-blocking
    mainWindow.webContents.on('did-finish-load', () => {
      console.log('Window loaded, starting AI initialization...');
      setImmediate(() => {
        initializeLlama().catch(err => {
          console.error('Failed to initialize AI:', err);
          mainWindow.webContents.executeJavaScript(`
            alert('Failed to load AI model: ${err.message}');
          `);
        });
      });
    });
  } else {
    // Show download page
    mainWindow.loadFile('download.html');
  }
}

async function initializeLlama() {
  try {
    console.log('=== STARTING MODEL LOAD ===');
    console.log('Checking if model is valid...');

    // Double check model is valid before trying to load
    if (!isModelValid()) {
      console.log('Model not valid, skipping initialization');
      throw new Error('Model file not found or invalid');
    }

    console.log('Loading node-llama-cpp...');
    console.log('Note: First load may take 1-2 minutes to compile native bindings');
    console.log('Please be patient, this is normal...');

    // Import node-llama-cpp (ES module) with timeout
    const startImport = Date.now();

    try {
      const { getLlama, LlamaChatSession } = await Promise.race([
        import('node-llama-cpp'),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Import timeout after 3 minutes')), 180000)
        )
      ]);

      const importTime = ((Date.now() - startImport) / 1000).toFixed(1);
      console.log(`✓ node-llama-cpp loaded in ${importTime} seconds`);

      console.log('Loading Phi-3 model from:', MODEL_PATH);
      console.log('This may take 20-30 seconds...');

      // Load the model using the correct API with optimized settings
      const startModelLoad = Date.now();
      const llama = await getLlama();
      model = await llama.loadModel({
        modelPath: MODEL_PATH,
        gpuLayers: 0 // Use CPU only for better compatibility
      });
      const modelLoadTime = ((Date.now() - startModelLoad) / 1000).toFixed(1);
      console.log(`✓ Model loaded in ${modelLoadTime} seconds`);

      console.log('Creating context...');
      const startContext = Date.now();
      context = await model.createContext({
        contextSize: 2048 // Smaller context for faster loading
      });
      const contextTime = ((Date.now() - startContext) / 1000).toFixed(1);
      console.log(`✓ Context created in ${contextTime} seconds`);

      console.log('Creating session...');
      session = new LlamaChatSession({
        contextSequence: context.getSequence()
      });

      const totalTime = ((Date.now() - startImport) / 1000).toFixed(1);
      console.log(`=== ✓ MODEL FULLY LOADED AND READY (Total: ${totalTime}s) ===`);

      // Notify renderer that model is ready
      if (mainWindow) {
        mainWindow.webContents.send('model-ready');
        console.log('Sent model-ready event to renderer');
      }
    } catch (importError) {
      console.error('=== IMPORT FAILED ===');
      console.error('Failed to import node-llama-cpp:', importError.message);
      throw new Error(`Cannot load AI library: ${importError.message}`);
    }
  } catch (error) {
    console.error('=== MODEL LOAD FAILED ===');
    console.error('Error initializing llama.cpp:', error.message);
    console.error('Full error:', error.stack);

    // Show user-friendly error with details
    if (mainWindow) {
      const errorMsg = error.message || 'Unknown error';
      mainWindow.webContents.executeJavaScript(`
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
          overlay.innerHTML = \`
            <img src="logo.png" alt="Kadam Logo" style="width: 100px; margin-bottom: 30px;">
            <div style="color: #d32f2f; font-size: 20px; font-weight: bold; margin-bottom: 10px;">⚠️ Failed to Load AI</div>
            <div style="color: #666; font-size: 14px; max-width: 500px; text-align: center;">${errorMsg}</div>
            <div style="color: #666; font-size: 12px; margin-top: 20px;">Check the console for details</div>
          \`;
        }
      `);
    }
    throw error;
  }
}

// Download model with redirect handling
ipcMain.handle('download-model', async (event) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(MODEL_PATH);
    let downloadedBytes = 0;
    let totalBytes = 0;

    function downloadFromUrl(url, redirectCount = 0) {
      if (redirectCount > 5) {
        reject(new Error('Too many redirects'));
        return;
      }

      https.get(url, (response) => {
        // Handle redirects
        if (response.statusCode === 301 || response.statusCode === 302 ||
            response.statusCode === 307 || response.statusCode === 308) {
          const redirectUrl = response.headers.location;
          console.log(`Following redirect to: ${redirectUrl}`);
          downloadFromUrl(redirectUrl, redirectCount + 1);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download: HTTP ${response.statusCode}`));
          return;
        }

        totalBytes = parseInt(response.headers['content-length'], 10);

        response.on('data', (chunk) => {
          downloadedBytes += chunk.length;
          const progress = (downloadedBytes / totalBytes) * 100;
          event.sender.send('download-progress', progress);
        });

        response.pipe(file);

        file.on('finish', () => {
          file.close();
          console.log('Model downloaded successfully');
          resolve(true);
        });

        file.on('error', (err) => {
          fs.unlink(MODEL_PATH, () => {});
          reject(err);
        });
      }).on('error', (err) => {
        fs.unlink(MODEL_PATH, () => {});
        reject(err);
      });
    }

    downloadFromUrl(MODEL_URL);
  });
});

// Check if model exists and is valid
ipcMain.handle('check-model', async () => {
  return isModelValid();
});

// Load main app after download
ipcMain.handle('load-main-app', async () => {
  mainWindow.loadFile('index.html');
  await initializeLlama();
  return true;
});

// AI inference handler
ipcMain.handle('ai-inference', async (event, prompt) => {
  console.log('AI inference requested:', prompt.substring(0, 50) + '...');

  if (!session) {
    console.error('Session is null - model not loaded');
    throw new Error('AI model not loaded yet. Please wait for the model to finish loading.');
  }

  try {
    console.log('Calling session.prompt...');
    const response = await session.prompt(prompt);
    console.log('AI response received:', response.substring(0, 50) + '...');
    return response;
  } catch (error) {
    console.error('Inference error:', error);
    throw error;
  }
});

// Get model status
ipcMain.handle('get-model-status', async () => {
  return {
    loaded: session !== null,
    path: MODEL_PATH,
    exists: fs.existsSync(MODEL_PATH)
  };
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
