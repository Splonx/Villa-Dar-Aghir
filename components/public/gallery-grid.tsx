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
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setSelectedIndex(null);
            }}
            className={`rounded-full px-4 py-1 text-sm transition ${
              activeCategory === category
                ? "bg-[#17130f] text-[#f3dfbd]"
                : "border border-[#c39a5b]/45 text-[#3a3026] hover:bg-[#f3dfbd]/45"
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
            className="group overflow-hidden rounded-2xl border border-[#c39a5b]/35 bg-white/80"
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
            <p className="px-3 py-2 text-left text-sm text-[#3a3026]">{photo.title}</p>
          </button>
        ))}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-[#f3dfbd] px-3 py-1 text-sm text-[#17130f]"
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
