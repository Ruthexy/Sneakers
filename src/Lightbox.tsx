import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
  images: string[];
  thumbs: string[];
  index: number;
  onClose: () => void;
  // pass React's setter directly
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Lightbox: React.FC<Props> = ({
  images,
  thumbs,
  index,
  onClose,
  setIndex,
}) => {
  // keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, onClose, setIndex]);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute top-6 right-6 text-white hover:opacity-70"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="w-7 h-7" />
      </button>

      <div className="max-w-2xl w-full">
        <div className="relative">
          <img
            src={images[index]}
            className="w-full rounded-2xl"
            alt={`Product large ${index + 1}`}
          />

          {/* Prev */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={() =>
              setIndex((i) => (i - 1 + images.length) % images.length)
            }
            className="z-20 absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 hover:opacity-80 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            <ChevronLeft />
          </button>

          {/* Next */}
          <button
            type="button"
            aria-label="Next image"
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            className="z-20 absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 hover:opacity-80 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-4">
          {thumbs.map((t, i) => (
            <button
              type="button"
              key={t}
              onClick={() => setIndex(i)}
              className={`relative rounded-xl overflow-hidden ring-2 transition ${
                i === index
                  ? "ring-orange-500"
                  : "ring-transparent hover:ring-orange-300"
              }`}
              aria-label={`Show image ${i + 1}`}
            >
              <img src={t} alt={`Thumbnail ${i + 1}`} />
              {i === index && <span className="absolute inset-0 bg-white/60" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
