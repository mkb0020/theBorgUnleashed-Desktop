# Troubleshooting Guide

Common issues and their solutions when building The Borg Unleashed desktop version.

---

## Installation Issues

### ❌ "Rust not found" or "cargo: command not found"

**Problem:** Rust isn't installed or not in PATH

**Solutions:**
1. Install Rust from https://rustup.rs/
2. Restart your terminal/command prompt
3. Test with: `rustc --version`
4. If still not working, restart your computer

**For Windows:** Make sure to run the installer as Administrator

---

### ❌ "npm: command not found"

**Problem:** Node.js isn't installed

**Solutions:**
1. Install Node.js from https://nodejs.org/
2. Choose the LTS version
3. Restart terminal after installation
4. Test with: `node --version`

---

### ❌ "Visual Studio Build Tools required" (Windows)

**Problem:** Missing C++ build tools

**Solutions:**
1. Download: https://visualstudio.microsoft.com/visual-cpp-build-tools/
2. Install "Desktop development with C++"
3. This is a ~6GB download - be patient!
4. Restart computer after installation

---

## Build Issues

### ❌ Build fails with "failed to run custom build command"

**Problem:** Usually Rust or build tools issue

**Solutions:**
```bash
# Update Rust
rustup update

# Clean build cache
cd src-tauri
cargo clean
cd ..

# Try building again
npm run build
```

---

### ❌ "error: linker `link.exe` not found"

**Problem:** Missing Visual Studio Build Tools

**Solution:** Install Visual Studio C++ Build Tools (see above)

---

### ❌ Build hangs or takes forever

**Problem:** First build compiles everything

**Solutions:**
- First build takes 5-15 minutes - this is normal!
- Subsequent builds are much faster (30 seconds - 2 minutes)
- Don't interrupt the first build
- Check Task Manager - if CPU usage is high, it's still working

---

### ❌ "Could not find icon.ico"

**Problem:** Missing icon files

**Solutions:**
```bash
# Auto-generate icons from a PNG
npm run tauri icon path/to/your-icon.png

# Or manually create all sizes (see ICONS.md)
```

Make sure you have:
- `src-tauri/icons/32x32.png`
- `src-tauri/icons/128x128.png`
- `src-tauri/icons/128x128@2x.png`
- `src-tauri/icons/icon.ico`

---

## Runtime Issues

### ❌ Game window opens but is blank/white

**Problem:** Assets not loading or JavaScript error

**Solutions:**
1. Open Dev Tools (F12) to see console errors
2. Check file paths in main.js - they should be relative:
   - ✅ `assets/images/title.png`
   - ❌ `/assets/images/title.png` (remove leading slash!)
3. Verify assets are in correct folders:
   ```
   src/assets/audio/
   src/assets/fonts/
   src/assets/images/
   ```
4. Check browser console for 404 errors

---

### ❌ Images/fonts/audio not loading

**Problem:** Incorrect file paths

**Solutions:**
1. All paths should be relative: `assets/images/file.png`
2. Not absolute: `/assets/images/file.png` or `C:/...`
3. Check file names match exactly (case-sensitive!)
4. Verify files exist in `src/assets/` folders

**Example main.js fixes:**
```javascript
// ❌ Wrong
const img = new Image();
img.src = '/assets/images/player.png';

// ✅ Correct
const img = new Image();
img.src = 'assets/images/player.png';
```

---

### ❌ "Cannot find module" errors

**Problem:** Missing main.js or incorrect import

**Solutions:**
1. Make sure `main.js` exists in `src/` folder
2. Check `index.html` has: `<script type="module" src="main.js"></script>`
3. If using imports, check file paths

---

### ❌ Controls don't work

**Problem:** Mobile code not removed, or keyboard not set up

**Solutions:**
1. Open `main.js.template` and follow the guide
2. Remove all touch event listeners
3. Remove joystick/jump button code
4. Ensure keyboard listeners are set up:
```javascript
window.addEventListener('keydown', (e) => {
  // Your keyboard handling
});
```

---

### ❌ Game runs slow/laggy

**Problem:** Performance issue

**Solutions:**
1. Check if dev tools are open (close them)
2. Make sure you're running the built version, not dev mode
3. Reduce canvas size in tauri.conf.json
4. Optimize your game loop
5. Check for console errors causing slowdowns

---

### ❌ Audio doesn't play

**Problem:** Audio permissions or file format

**Solutions:**
1. Check audio files are in `src/assets/audio/`
2. Supported formats: MP3, WAV, OGG
3. Test audio in dev mode first
4. Check mute button isn't active
5. Check Windows volume isn't muted

---

### ❌ "Error: Invalid configuration"

**Problem:** Syntax error in tauri.conf.json

**Solutions:**
1. Validate JSON at https://jsonlint.com/
2. Check for missing commas, brackets, or quotes
3. Compare with the provided template
4. Don't leave trailing commas

---

## Icon Issues

### ❌ Icon doesn't show in window/taskbar

**Problem:** Icon not generated or wrong format

**Solutions:**
```bash
# Regenerate icons
npm run tauri icon your-icon.png

# Or manually check:
# - icon.ico exists in src-tauri/icons/
# - icon.ico is a valid Windows icon file
# - All PNG sizes exist
```

---

### ❌ Icon looks pixelated

**Problem:** Source image too small

**Solutions:**
1. Start with high-res source (1024x1024 minimum)
2. Use PNG format with transparent background
3. Regenerate all sizes from high-res source

---

## Installer Issues

### ❌ Can't find the .msi installer

**Problem:** Looking in wrong location

**Solution:** The installer is at:
```
src-tauri/target/release/bundle/msi/
```

Look for: `The Borg Unleashed_1.0.0_x64_en-US.msi`

---

### ❌ Installer won't run / "Unknown Publisher" warning

**Problem:** Unsigned installer (normal for personal projects)

**Solutions:**
- Click "More info" → "Run anyway"
- This is normal for unsigned apps
- To remove warning, you need to code-sign ($$$ cost)
- Users will see this warning for any unsigned app

---

### ❌ Game installs but won't launch

**Problem:** Missing dependencies or corrupted build

**Solutions:**
1. Rebuild from scratch:
```bash
cd src-tauri
cargo clean
cd ..
npm run build
```
2. Check Windows Event Viewer for crash details
3. Try running the .exe directly from:
   `src-tauri/target/release/the-borg-unleashed.exe`

---

## Development Workflow Issues

### ❌ Changes not showing in dev mode

**Problem:** Dev server not reloading

**Solutions:**
1. Stop dev mode (Ctrl+C)
2. Clear any caches
3. Run `npm run dev` again
4. Hard refresh (Ctrl+Shift+R)

---

### ❌ "Address already in use" error

**Problem:** Dev server already running

**Solutions:**
1. Close any other instances
2. Kill the process:
   - Windows: `taskkill /F /IM cargo.exe`
   - Check Task Manager for stuck processes
3. Try a different port in package.json

---

## Still Having Issues?

### Debug Checklist

- [ ] Rust installed? (`rustc --version`)
- [ ] Node.js installed? (`node --version`)
- [ ] Visual Studio Build Tools installed? (Windows)
- [ ] All assets copied to `src/assets/`?
- [ ] Icons generated in `src-tauri/icons/`?
- [ ] main.js adapted for desktop (no mobile code)?
- [ ] File paths are relative (no leading `/`)?
- [ ] Ran `npm install`?
- [ ] Console shows any errors?

### Getting Help

1. Check the console (F12) for JavaScript errors
2. Check terminal for build errors
3. Re-read README.md and QUICKSTART.md
4. Try the CHECKLIST.md to see what's missing
5. Search for the exact error message online
6. Check Tauri documentation: https://tauri.app/

### Common Search Terms

- "Tauri [your error message]"
- "Rust [your error message]"
- "Tauri assets not loading"
- "Tauri Windows build error"

---

## Prevention Tips

✅ **Always:**
- Use relative paths in code
- Test in dev mode before building
- Keep backups of working versions
- Read error messages carefully
- Check console for errors

❌ **Never:**
- Interrupt the first build
- Use absolute file paths
- Forget to run `npm install`
- Skip the prerequisite installations
- Commit build artifacts to git

---

## Emergency Reset

If everything is broken and you want to start fresh:

```bash
# Clean everything
cd src-tauri
cargo clean
cd ..
rm -rf node_modules package-lock.json
rm -rf src-tauri/target

# Reinstall
npm install

# Try again
npm run dev
```

This will delete all build files and start over. Your source code is safe!

---

Remember: The first build always takes the longest. Be patient! ☕