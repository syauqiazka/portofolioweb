# Live2D VTuber Integration Workflow

## Current Status
- ✅ Live2DCharacter component created
- ✅ Dependencies installed (pixi.js@6, pixi-live2d-display)
- ✅ Model sheet available: Alya Zehra Vtuber Model Sheet.png
- ⏳ **AWAITING**: Layered PSD + Live2D rigging

## Asset Preparation Required

### 1. Layer Separation (Illustrator Work)
**Source**: `Alya Zehra Vtuber Model Sheet.png` (front view)

**Required Layers** (organize in PSD):
```
Root Group
├── Face/
│   ├── face_base.png
│   ├── face_shadow.png
│   ├── blush_neutral.png
│   └── blush_heavy.png
├── Eyes/
│   ├── Left/
│   │   ├── eye_L_white.png
│   │   ├── eye_L_iris.png
│   │   ├── eye_L_pupil.png
│   │   ├── eye_L_highlight.png
│   │   ├── eyelid_L_upper.png
│   │   └── eyelashes_L.png
│   └── Right/ (same structure)
├── Eyebrows/
│   ├── eyebrow_L.png
│   └── eyebrow_R.png
├── Mouth/
│   ├── mouth_A.png
│   ├── mouth_I.png
│   ├── mouth_U.png
│   ├── mouth_E.png
│   └── mouth_O.png
├── Glasses/
│   ├── glasses_frame.png
│   ├── glasses_lens_L.png
│   └── glasses_lens_R.png
├── Hijab/ (CRITICAL - needs 8-12 layers for physics)
│   ├── hijab_back.png
│   ├── hijab_main.png
│   ├── hijab_drape_L.png
│   ├── hijab_drape_R.png
│   ├── hijab_pattern.png (floral overlay)
│   └── hijab_shadow.png
├── Body/
│   ├── neck.png
│   ├── torso_base.png
│   ├── clothing_pink.png
│   ├── embroidery_detail.png
│   ├── sleeve_L.png
│   └── sleeve_R.png
```

**Key Requirements**:
- Each layer: transparent PNG, same canvas size (recommend 2048x2048px)
- Reconstruct hidden areas (forehead behind hijab, full eyes behind glasses)
- Add ~10% extra area around edges for deformation
- Export as organized PSD with named layer groups

**Time Estimate**: 2-4 hours for skilled illustrator

---

### 2. Live2D Cubism Rigging

**Software**: Live2D Cubism Editor (https://www.live2d.com/en/download/cubism/)
- Free version: Limited parameters
- PRO version: ~$50-200 (recommended for quality)

**Rigging Steps**:
1. Import PSD to Cubism Editor
2. Create meshes for each deformable part
3. Setup parameters:
   - ParamAngleX (head tilt left/right): -30 to +30
   - ParamAngleY (head turn): -30 to +30
   - ParamAngleZ (head rotate): -10 to +10
   - ParamEyeLOpen / ParamEyeROpen (blink): 0 to 1
   - ParamEyeBallX / ParamEyeBallY (eye tracking): -1 to +1
   - ParamMouthForm (A/I/U/E/O shapes)
   - ParamBodyAngleX/Y (torso movement)
4. Add physics:
   - Hijab sections (gravity, bounce, damping)
   - Glasses subtle bounce
5. Test all motions
6. Export as `.model3.json`

**Time Estimate**: 4-8 hours for beginner, 2-4 hours for experienced rigger

**Output Files**:
```
public/models/alya/
├── alya.model3.json     (model definition)
├── alya.moc3            (compiled mesh data)
├── alya.physics3.json   (physics settings)
├── alya.pose3.json      (pose data, optional)
├── textures/
│   └── texture_00.png   (atlas texture, auto-generated)
└── motions/              (optional idle/talking animations)
    ├── idle.motion3.json
    └── tap_body.motion3.json
```

---

### 3. Cubism Core Integration

Add Cubism runtime to `public/` or load dynamically:

**Option A: Local (Recommended for production)**
1. Download Cubism 4 SDK from https://www.live2d.com/download/cubism-sdk/
2. Extract `live2dcubismcore.min.js`
3. Place in `public/live2d-assets/live2dcubismcore.min.js`
4. Add to `src/app/layout.tsx`:
```tsx
<Script 
  src="/live2d-assets/live2dcubismcore.min.js" 
  strategy="beforeInteractive"
/>
```

**Option B: CDN (Quick testing only)**
```html
<script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
```
⚠️ CDN unreliable, don't use in production

---

### 4. Hero Integration

Once model ready, edit `src/components/HeroGSAP.tsx`:

```tsx
import dynamic from 'next/dynamic';

const Live2DCharacter = dynamic(() => import('@/components/Live2DCharacter'), {
  ssr: false,
  loading: () => <div className="w-[400px] h-[600px]" />
});

export default function HeroGSAP({ isDarkTheme }: HeroProps) {
  // ... existing code ...
  
  return (
    <section className="relative min-h-[105vh] ...">
      {/* Existing sky background */}
      
      {/* ADD: Live2D Character */}
      <Live2DCharacter
        modelUrl="/models/alya/alya.model3.json"
        className="absolute right-0 top-16 w-[300px] h-[500px] hidden lg:block pointer-events-none"
        scale={0.28}
      />
      
      {/* Existing hero content */}
    </section>
  );
}
```

**Position Guidelines**:
- Desktop: Right side, doesn't overlap headline
- Tablet: Smaller scale or hide
- Mobile: Hidden (space constraints)

---

### 5. Testing Checklist

Once integrated:
- [ ] Model loads without console errors
- [ ] Character visible at correct position
- [ ] No overlap with text/buttons
- [ ] Eye tracking works (if implemented)
- [ ] Blinking animation smooth
- [ ] Hijab physics natural (not jittery)
- [ ] Resize doesn't break layout
- [ ] Mobile: hidden or properly scaled
- [ ] Performance: 60fps maintained
- [ ] Memory: no leaks after page navigation

---

## Alternative: Commissioned Work

If self-rigging not feasible:

**Fiverr/VGen Artists**: $200-800 for half-body Live2D model
- Provide model sheet
- Request layered PSD + rigged .model3.json
- Specify Cubism 4 format
- Request test motion videos
- Typical delivery: 1-2 weeks

**Search keywords**: "Live2D rigging", "VTuber model rigging", "Cubism editor rigging"

---

## Resources

- Live2D Cubism Editor: https://www.live2d.com/en/download/cubism/
- Official tutorials: https://docs.live2d.com/en/cubism-editor-manual/
- pixi-live2d-display docs: https://guansss.github.io/pixi-live2d-display/
- Community: r/Live2D, Live2D Discord

---

## Next Steps

1. **Immediate**: Commission illustrator for layer separation OR learn layer cutting
2. **After PSD ready**: Learn Cubism Editor basics (1-2 days)
3. **Rigging**: Follow official tutorials, allow 1 week for first model
4. **Integration**: Use this workflow doc + Live2DCharacter component
5. **Testing**: Verify all checklist items above

**Current blocker**: Need layered PSD. Model sheet alone cannot be auto-converted to Live2D without manual illustration work.
