# 🚀 Quick Start - The Borg Unleashed - Desktop

## For Absolute Beginners

### Step 1: Install Prerequisites (One-time setup)

1. **Install Rust** (takes 5-10 minutes)
   - Go to https://rustup.rs/
   - Download and run the installer
   - Follow the prompts (default options are fine)
   - Restart your terminal/command prompt when done

2. **Install Node.js** (optional, takes 5 minutes)
   - Go to https://nodejs.org/
   - Download the LTS version
   - Run the installer (default options are fine)

3. **Install Visual Studio C++ Build Tools** (Windows only, takes 10-15 minutes)
   - Go to https://visualstudio.microsoft.com/visual-cpp-build-tools/
   - Download and run
   - Select "Desktop development with C++"
   - Click Install

### Step 2: Set Up Your Project 

1. **Copy game files:**
   ```
   Copy main.js → src/main.js
   Copy audio/ folder → src/assets/audio/
   Copy fonts/ folder → src/assets/fonts/
   Copy images/ folder → src/assets/images/
   ```

2. **Generate icons:**
   - Open a terminal in the project folder
   - Run: `npm install`
   - Run: `npm run tauri icon path/to/your-icon.png`
   
   (Or manually create icons using the ICONS.md guide)


### Step 3: Test It 

```bash
npm run dev
```

Your game should open in a window! Test:
- Arrow keys move the player
- Spacebar makes the player jump
- Mute button works
- Game plays smoothly

### Step 4: Build the Installer 

```bash
npm run build
```

Wait for it to finish (first build takes longer).

### Step 5: Find Your Game!

Your installer will be at:
```
src-tauri/target/release/bundle/msi/The Borg Unleashed_1.0.0_x64_en-US.msi
```

Double-click to install and play!

---

## 🆘 Help! Something's Not Working

### "Rust not found" or "cargo not found"
- Make sure you installed Rust from rustup.rs
- Close and reopen your terminal
- Try running: `rustc --version`

### "npm not found"
- Install Node.js from nodejs.org
- Restart your terminal

### Build fails with "Visual Studio" error
- Install Visual Studio C++ Build Tools
- Make sure "Desktop development with C++" is checked

### Game window is blank
- Check that all assets are in the right folders
- Open browser console (F12) to see errors
- Make sure paths in main.js don't have leading `/`

### Icons not showing
- Run: `npm run tauri icon your-icon.png`
- Or manually create the required sizes (see ICONS.md)

---

## 📱 Common Commands

```bash
# Install dependencies (first time only)
npm install

# Run in development mode (for testing)
npm run dev

# Build the installer (for distribution)
npm run build

# Generate icons from a PNG
npm run tauri icon path/to/icon.png
```

---

## 🎮 Controls (Desktop Version)

- **Arrow Keys** or **WASD** - Move
- **Spacebar** or **Up Arrow** - Jump
- **Mute Button** (top right) - Toggle sound

---

## ✅ You're Done When...

1. Game runs with `npm run dev`
2. All controls work with keyboard
3. No errors in console
4. Build completes successfully
5. Installer installs and runs the game

Then you're ready to share your game! 🎉

---

**Need more help?** Check the README.md for detailed explanations, or the CHECKLIST.md to see what might be missing.