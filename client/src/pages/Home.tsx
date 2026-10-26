// Plateful — editorial market system (NYT Cooking structure, 2026-10-26).
// Screens live in components/editorial/screens; state in hooks/usePlateful. The pre-redesign
// single-file app is kept as HomeLegacy.tsx (meal plan, retailer modal, daily deal) until those move over.
import { PlatefulProvider } from '@/hooks/usePlateful';
import { Shell } from '@/components/editorial/Shell';

export default function Home() {
  return (
    <PlatefulProvider>
      <Shell />
    </PlatefulProvider>
  );
}
