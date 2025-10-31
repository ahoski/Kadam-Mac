const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Download model
  downloadModel: () => ipcRenderer.invoke('download-model'),

  // Check if model exists
  checkModel: () => ipcRenderer.invoke('check-model'),

  // Load main app
  loadMainApp: () => ipcRenderer.invoke('load-main-app'),

  // AI inference
  aiInference: (prompt) => ipcRenderer.invoke('ai-inference', prompt),

  // Get model status
  getModelStatus: () => ipcRenderer.invoke('get-model-status'),

  // Listen for download progress
  onDownloadProgress: (callback) => {
    ipcRenderer.on('download-progress', (event, progress) => callback(progress));
  },

  // Listen for model ready
  onModelReady: (callback) => {
    ipcRenderer.on('model-ready', callback);
  },

  // Remove listeners
  removeDownloadProgressListener: () => {
    ipcRenderer.removeAllListeners('download-progress');
  },

  removeModelReadyListener: () => {
    ipcRenderer.removeAllListeners('model-ready');
  }
});
