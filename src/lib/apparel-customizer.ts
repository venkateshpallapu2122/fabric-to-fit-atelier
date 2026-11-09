export type ArtworkTransform = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

export function clampArtworkTransform(transform: ArtworkTransform): ArtworkTransform {
  const width = clamp(transform.width, 6, 80);
  const height = clamp(transform.height, 6, 80);

  return {
    x: clamp(transform.x, width / 2, 100 - width / 2),
    y: clamp(transform.y, height / 2, 100 - height / 2),
    width,
    height,
  };
}

export function moveArtworkTransform(
  transform: ArtworkTransform,
  deltaX: number,
  deltaY: number,
): ArtworkTransform {
  return clampArtworkTransform({
    ...transform,
    x: transform.x + deltaX,
    y: transform.y + deltaY,
  });
}

export function resizeArtworkTransform(
  transform: ArtworkTransform,
  width: number,
  height: number,
): ArtworkTransform {
  return clampArtworkTransform({ ...transform, width, height });
}