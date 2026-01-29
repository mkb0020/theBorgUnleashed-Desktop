# Icon Requirements for Tauri

## Required Icon Files

Place these in `src-tauri/icons/`:

```
icons/
├── 32x32.png           (32x32 pixels)
├── 128x128.png         (128x128 pixels)
├── 128x128@2x.png      (256x256 pixels)
├── icon.ico            (Windows icon, multi-resolution)
└── icon.icns           (macOS icon, if supporting Mac)
```

## Easy Icon Generation

### Option 1: Use Tauri CLI (Recommended)
If you have a single PNG file (ideally 512x512 or 1024x1024):

```bash
npm install -g @tauri-apps/cli
npm run tauri icon path/to/your-icon.png
```

This will automatically generate all required sizes!

### Option 2: Online Tools
1. Go to https://www.favicon-generator.org/
2. Upload your icon
3. Download the generated package
4. Extract and rename files as needed

### Option 3: Manual Creation
Use any image editor (GIMP, Photoshop, Paint.NET):
1. Start with a high-res square image (1024x1024)
2. Resize to each required size
3. Export as PNG
4. For .ico, use an ICO converter tool



## Where the Icon Appears

- Window title bar
- Windows taskbar
- Start menu
- Desktop shortcut (if created)
- Alt+Tab app switcher
- Task Manager
- Installation wizard
- Add/Remove Programs list

