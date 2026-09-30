"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductGallery({
  name,
  images,
  preorder = false
}: {
  name: string;
  images: string[];
  preorder?: boolean;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex] ?? images[0];
  const showPrevious = () =>
    setSelectedIndex((current) => (current - 1 + images.length) % images.length);
  const showNext = () =>
    setSelectedIndex((current) => (current + 1) % images.length);

  return (
    <div className="grid gap-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-oat shadow-soft">
        <Image
          src={selectedImage}
          alt={`${name} — view ${selectedIndex + 1}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <span className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] shadow-soft ${
          preorder ? "bg-oat text-clay" : "bg-[#e7d6a6]/95 text-[#665323]"
        }`}>
          {preorder ? "Preorder" : "In stock"}
        </span>
        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className="focus-ring absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-clay/15 bg-white/90 text-clay shadow-soft backdrop-blur transition hover:bg-white hover:text-ink"
              aria-label={`Show previous ${name} image`}
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="focus-ring absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-clay/15 bg-white/90 text-clay shadow-soft backdrop-blur transition hover:bg-white hover:text-ink"
              aria-label={`Show next ${name} image`}
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5" aria-label={`${name} image gallery`}>
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`focus-ring overflow-hidden rounded-sm border-2 bg-oat transition ${
                selectedIndex === index
                  ? "border-clay"
                  : "border-transparent hover:border-clay/40"
              }`}
              aria-label={`Show ${name} image ${index + 1}`}
              aria-pressed={selectedIndex === index}
            >
              <span className="relative block aspect-square">
              <Image
                src={image}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
