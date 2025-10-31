# Kadam - Offline AI-Powered Learning Platform

Kadam is an offline AI-powered learning platform that uses Microsoft's Phi-3 Mini model to provide intelligent feedback and generate educational content, all without requiring an internet connection.

## Features

- 📚 Interactive learning modules (comics, passages, questions)
- 🤖 Offline AI assistance powered by Phi-3 Mini
- 📝 Multiple question types (MCQ, reorder, free text)
- 💡 Word vault and hints functionality
- 🎯 Personalized learning experience

## Installation

### macOS

1. Download `Kadam-1.0.2-arm64.dmg` from the [Releases page](https://github.com/ahoski/Kadam-Mac/releases)
2. Open the DMG file
3. Drag Kadam to your Applications folder

#### Important: Handling "Damaged App" Warning

Since this app is not code-signed with an Apple Developer certificate, macOS Gatekeeper may show a warning that the app is "damaged". This is a security feature, not an actual problem with the app.

**To fix this, run the following command in Terminal:**

```bash
xattr -cr /Applications/Kadam.app
```

Or, if you haven't moved it to Applications yet:

```bash
xattr -cr "/Volumes/Kadam 1.0.2-arm64/Kadam.app"
```

After running this command, you should be able to open Kadam normally.

**Alternative method:**
1. Right-click (or Control+click) on Kadam.app
2. Select "Open" from the menu
3. Click "Open" in the security dialog

### First Launch

On first launch, Kadam will prompt you to download the AI model (~2.4 GB). This is a one-time download, and after that, Kadam works completely offline.

## System Requirements

- macOS 10.12 or later
- Apple Silicon (M1/M2/M3) Mac
- ~3 GB free disk space (for the AI model)

## Development

### Prerequisites

- Node.js 16 or later
- npm

### Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm start

# Build for macOS
npm run build:mac
```

## License

MIT

## Support

If you encounter any issues, please [open an issue](https://github.com/ahoski/Kadam-Mac/issues) on GitHub.
