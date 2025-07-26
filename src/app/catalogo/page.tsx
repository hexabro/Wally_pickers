import { Suspense } from 'react';
import CatalogContent from '@/components/CatalogContent';

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
