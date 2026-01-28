#  💥 THE BORG UNLEASHED - Desktop Edition 💥

**🐕 Time for a W-A-L-K 🐕**

**THE BORG UNLEASHED** is a simple, 8-bit–style infinite platformer where you play as **Inge**, a very good (and very unleashed) Rottweiler.

- Run forever.  
- Jump endlessly.  
- Collect stuffed hamburgers. 🍔
- (But don't eat the stuffing!)

- There's no bad guys.  
- There's no timer.  
- Just Borgs and burgers.

---

## 👾 About This Version 👾

This is the **Windows Desktop Edition** built with Tauri - a native Windows app version of The Borg Unleashed.

**Features:**
- Native Windows application (.msi installer)
- Optimized for desktop/PC gameplay
- Keyboard-only controls
- Offline-ready
- 33% less code than the web version
- Better performance

(*I am still not to be held responsible for any unreachable platforms*)

---

## 🎮 Controls 🎮

- **Arrow Keys** or **WASD** – Move left and right
- **Spacebar** or **Up Arrow** or **W** – Jump
- **Mute Button** (top right) – Toggle sound on/off

Simple. Clean. No touch controls needed.

---

## 🚀 For Players - How to Install

1. Download the `.msi` installer
2. Double-click to install
3. Launch "The Borg Unleashed" from your Start Menu
4. Enjoy!

**Note:** Windows may show an "Unknown Publisher" warning since the app isn't code-signed. Click "More info" → "Run anyway" to install.

---

## 🛠️ For Developers - Building From Source

Want to build the game yourself? Here's how:

### Prerequisites

1. **Rust** - https://rustup.rs/
2. **Node.js** (optional) - https://nodejs.org/
3. **Visual Studio C++ Build Tools** - https://visualstudio.microsoft.com/visual-cpp-build-tools/
   - Select "Desktop development with C++" workload

### Quick Start

```bash
# Install dependencies
npm install

# Generate icons (if you have a source image)
npm run tauri icon path/to/your-icon.png

# Test in development mode
npm run dev

# Build the installer
npm run build
```

### First Time Setup

1. **Copy game assets:**
   ```
   Copy assets/audio/ → src/assets/audio/
   Copy assets/fonts/ → src/assets/fonts/
   Copy assets/images/ → src/assets/images/
   ```

2. **Generate icons** (see `ICONS.md` for details)

3. **Test it:** `npm run dev`

4. **Build installer:** `npm run build`

### Where's My Installer?

After building, find your installer at:
```
src-tauri/target/release/bundle/msi/The Borg Unleashed_1.0.0_x64_en-US.msi
```

### Documentation

- **QUICKSTART.md** - Fast setup guide for beginners
- **STRUCTURE.md** - Project folder layout
- **CHANGES.md** - What's different from the web version
- **CHECKLIST.md** - Track your build progress
- **TROUBLESHOOTING.md** - Fix common issues
- **ICONS.md** - Icon requirements and generation

---

## 📂 Project Structure

```
the-borg-unleashed/
├── src/                    # Game files
│   ├── index.html          # Desktop-optimized HTML
│   ├── main.js             # Desktop-optimized JavaScript
│   └── assets/             # Audio, fonts, images
├── src-tauri/              # Tauri configuration
│   ├── src/main.rs         # Rust entry point
│   ├── icons/              # App icons
│   ├── Cargo.toml          # Rust dependencies
│   └── tauri.conf.json     # App configuration
└── [docs]/                 # Documentation files
```

---

## 🎵 Music

All music in the game is original.

- **Track:** *Arcade Vibe Beat no 4*  
- **By:** MK
- **Available to download on itch.io - Arcade Vibe Beats vol 2**

---

## ⚙️ Configuration

### Window Settings

Edit `src-tauri/tauri.conf.json` to customize:
- Window size (default: 1280x720)
- Minimum window size (default: 800x600)
- App name and identifier
- Whether window is resizable

### App Metadata

Edit `src-tauri/Cargo.toml` to update:
- Version number
- Author information
- Description

---

## 🎯 What's Different from the Web Version?

**Removed:**
- Mobile touch controls (joystick, jump button)
- Portrait/landscape orientation handling
- Mobile detection code
- Touch event listeners

**Result:**
- 33% less JavaScript code
- 52% less CSS code
- Cleaner, desktop-focused codebase
- Better performance
- Native Windows app

See `CHANGES.md` for a detailed breakdown.

---

## 🐛 Troubleshooting

Having issues? Check these common solutions:

1. **Rust not found** - Install from rustup.rs and restart terminal
2. **Build fails** - Make sure Visual Studio C++ Build Tools are installed
3. **Assets not loading** - Use relative paths (no leading `/`)
4. **Blank window** - Open dev tools (F12) to check console errors
5. **Icons missing** - Run `npm run tauri icon your-icon.png`

For more help, see `TROUBLESHOOTING.md`.

---

## 🍔 Credits & Inspiration 🍔

- Game created by **MK**
- Dedicated to **Inge Borg**
- Desktop version built with **Tauri**
- Powered by **Kaplay** game engine

---

## 🎮 Gameplay Philosophy 🎮

- Infinite side-scrolling platformer
- Simple controls
- Endless platforms
- Stuffed hamburgers for points
- No enemies
- No stress
- No endings
- No leashes

Just you, the platforms, and the burgers. Forever.

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Web Version:** [Link to your web version if you have one]
- **Itch.io:** [Your itch.io page]
- **Music:** Available on itch.io - Arcade Vibe Beats vol 2

---

## 🎉 Have Fun!

Inge is unleashed. The platforms are endless. The burgers are plentiful.

**Good luck, and happy jumping!** 🐕🍔

---

*Built with ❤️ for Inge Borg*