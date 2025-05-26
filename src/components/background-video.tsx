'use client';

import { useEffect, useState } from 'react';

export function BackgroundVideo() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden">
      <video className="absolute w-full h-full object-cover" autoPlay loop muted playsInline>
        <source src="/portfolio-v2-cafe-coding.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
