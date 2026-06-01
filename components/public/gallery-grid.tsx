"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Photo } from "@/lib/types";

type Props = {
  photos: Photo[];
};

export function GalleryGrid({ photos }: Props) {
  const categories = useMemo(
    () => ["Tous", ...Array.from(new Set(photos.map((photo) => photo.category)))],
    [photos],
  );
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "Tous"
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

  const selected = selectedIndex !== null ? filtered[selectedIndex] : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setSelectedIndex(null);
            }}
            className={`rounded-full px-4 py-1 text-sm ${
              activeCategory === category
                ? "bg-[#2f6150] text-white"
                : "border border-[#c8baa3] text-[#1f2a24]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => setSelectedIndex(index)}
            className="group overflow-hidden rounded-2xl border border-[#d7cab5] bg-white"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={photo.image_url}
                alt={photo.title}
                fill
                loading="lazy"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <p className="px-3 py-2 text-left text-sm text-[#32443b]">{photo.title}</p>
          </button>
        ))}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-sm"
          >
            Fermer
          </button>
          <div className="relative h-[75vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-black">
            <Image src={selected.image_url} alt={selected.title} fill className="object-contain" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
