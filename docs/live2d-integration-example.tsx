// Example integration untuk Hero component
// Uncomment ketika model Live2D sudah ready

/*
import dynamic from 'next/dynamic';

const Live2DCharacter = dynamic(() => import('@/components/Live2DCharacter'), {
  ssr: false,
  loading: () => (
    <div className="w-[300px] h-[500px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

// Add to Hero return, after background elements:
<Live2DCharacter
  modelUrl="/models/alya/alya.model3.json"
  className="absolute right-0 top-16 w-[300px] h-[500px] hidden lg:block pointer-events-none z-20"
  scale={0.28}
  position={{ x: 0, y: 0 }}
/>

// Positioning notes:
// - Desktop (lg+): Right side, doesn't overlap headline
// - Scale 0.28: Fits ~500px height for half-body
// - pointer-events-none: Doesn't block clicks on hero content
// - z-20: Above background, below navbar (z-50)
*/

// Responsive variants jika perlu adjustment per breakpoint:
/*
// Desktop: Full size
<div className="hidden lg:block">
  <Live2DCharacter
    modelUrl="/models/alya/alya.model3.json"
    className="absolute right-0 top-16 w-[300px] h-[500px]"
    scale={0.28}
  />
</div>

// Tablet: Smaller
<div className="hidden md:block lg:hidden">
  <Live2DCharacter
    modelUrl="/models/alya/alya.model3.json"
    className="absolute right-0 top-20 w-[200px] h-[350px]"
    scale={0.2}
  />
</div>

// Mobile: Hidden (space constraints)
*/

export {};
