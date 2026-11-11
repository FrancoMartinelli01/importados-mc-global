import { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const showControls = images.length > 1;

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      setSelectedIndex(index);
    },
    [emblaApi],
  );

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  // Sync selected index on scroll
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Attach listener
  useState(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  });

  // Re-attach when api ready
  if (emblaApi) {
    emblaApi.on('select', onSelect);
  }

  return (
    <div className="space-y-3">
      {/* Main image carousel */}
      <div className="relative overflow-hidden rounded-md bg-secondary group">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {images.map((src, i) => (
              <div key={i} className="min-w-0 shrink-0 grow-0 basis-full">
                <img
                  src={src}
                  alt={`${name} - foto ${i + 1}`}
                  className="w-full aspect-square object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        {showControls && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>

            {/* Dots for mobile */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    i === selectedIndex ? 'w-6 bg-primary' : 'w-2 bg-background/60'
                  }`}
                  aria-label={`Ir a foto ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {showControls && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === selectedIndex
                  ? 'border-foreground ring-1 ring-foreground/20'
                  : 'border-transparent hover:border-border'
              }`}
            >
              <img
                src={src}
                alt={`${name} miniatura ${i + 1}`}
                className="h-16 w-16 object-cover sm:h-20 sm:w-20"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
