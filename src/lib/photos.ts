import type { ImageMetadata } from 'astro';

/**
 * Real photos are picked up automatically from src/assets/photos/.
 * Name them viaduct, town-hall, market-hall, mersey or emma (any of .jpg .jpeg .png .webp .avif).
 * Until a photo exists, the illustrated sketch (or portrait placeholder) is shown instead.
 */
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

export function photo(name: string): ImageMetadata | undefined {
  for (const [path, mod] of Object.entries(files)) {
    const file = path.split('/').pop() ?? '';
    if (file.replace(/\.[^.]+$/, '') === name) return mod.default;
  }
  return undefined;
}
