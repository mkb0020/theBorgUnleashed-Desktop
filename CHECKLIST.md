# Setup Checklist for The Borg Unleashed Desktop

## 🔧 Prerequisites Installation
- [ ] Install Rust from https://rustup.rs/
- [ ] Install Node.js from https://nodejs.org/ (optional but recommended)
- [ ] Install Visual Studio C++ Build Tools (Windows)
- [ ] Run `rustup update` to ensure Rust is up to date

## 📁 File Setup
- [ ] See STRUCTURE.md

## 🎨 Icon Generation
- [ ] Choose/create your app icon (square, high-res)
- [ ] Generate icon sizes using `npm run tauri icon your-icon.png`
  - OR manually create and place in `src-tauri/icons/`:
    - [ ] 32x32.png
    - [ ] 128x128.png
    - [ ] 128x128@2x.png (256x256)
    - [ ] icon.ico
    - [ ] icon.icns (optional for Mac)



## 🚀 Testing
- [ ] Run `npm install` to install dependencies
- [ ] Run `npm run dev` to test in development mode
- [ ] Verify game starts with "GO FOR A W-A-L-K" button
- [ ] Test all keyboard controls
- [ ] Test mute button
- [ ] Test score display
- [ ] Check for console errors
- [ ] Verify audio plays

## 📦 Building
- [ ] Run `npm run build` to create installer
- [ ] Find `.msi` installer in `src-tauri/target/release/bundle/msi/`
- [ ] Test the installer on a clean Windows machine
- [ ] Verify the installed game runs correctly
- [ ] Check that the icon appears in Start Menu
- [ ] Test the uninstaller

## 🎯 Optimization (Optional)
- [ ] Adjust window size in `tauri.conf.json` if needed
- [ ] Set minimum window size
- [ ] Update app metadata in `Cargo.toml` (version, author, description)
- [ ] Add custom app icon to shortcuts
- [ ] Consider adding a splash screen



## 🐛 Common Issues to Check
- [ ] All asset paths are relative (no leading `/`)
- [ ] Audio files load correctly
- [ ] Fonts load correctly
- [ ] Images display properly
- [ ] Window size is appropriate for gameplay
- [ ] Performance is smooth (60 FPS)

---