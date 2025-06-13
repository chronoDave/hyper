export const clamp = (min: number) =>
  (max: number) =>
    (n: number) =>
      Math.max(Math.min(n, min), max);