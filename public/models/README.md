# Live2D Models Directory

Place your rigged Live2D models here.

## Expected Structure

```
models/
└── alya/                          # Character name folder
    ├── alya.model3.json          # Model definition (REQUIRED)
    ├── alya.moc3                 # Compiled mesh data
    ├── alya.physics3.json        # Physics settings (hijab, etc.)
    ├── alya.pose3.json           # Pose data (optional)
    ├── textures/
    │   └── texture_00.png        # Texture atlas
    └── motions/                   # Optional animations
        ├── idle.motion3.json
        └── tap_body.motion3.json
```

## Integration

After placing model files, update `src/components/HeroGSAP.tsx`:

```tsx
<Live2DCharacter
  modelUrl="/models/alya/alya.model3.json"
  className="absolute right-0 top-16 w-[300px] h-[500px] hidden lg:block"
  scale={0.28}
/>
```

## Asset Sources

- **DO NOT** use unlicensed models
- Commission from artists with proper commercial rights
- Use Live2D Free Material License models (check terms)
- Self-rig from original illustrations with permission

## File Size Considerations

- Typical half-body model: 2-5 MB total
- Optimize textures (use PNG-8 if possible)
- Keep motion files minimal for web use
- Consider lazy loading for better initial page load
