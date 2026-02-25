export const get = <T>(arr: T[]) =>
  (i: number): T | null =>
    arr[i] ?? null;

export const fill = (n: number) =>
  <T>(fn: (i: number, arr: T[]) => T): T[] => {
    const arr = Array.from<T>({ length: n });

    for (let i = 0; i < arr.length; i += 1) {
      arr[i] = fn(i, arr);
    }

    return arr;
  };

/** Returns index of left-most value, rounded down */
export const bisectLeft = (arr: number[]) =>
  (n: number) => {
    let l = 0;
    let r = arr.length;

    while (l < r) {
      const m = l + Math.floor((r - l) / 2);

      if (arr[m] < n) {
        l = m + 1;
      } else {
        r = m;
      }
    }

    // Left-most duplicate
    while (
      l > 0 &&
      (arr[l] > n || arr[l - 1] === arr[l])
    ) l -= 1;

    return Math.min(arr.length - 1, l);
  };

/** Return index of right-most value, rounded up */
export const bisectRight = (arr: number[]) =>
  (n: number) => {
    let l = 0;
    let r = arr.length;

    while (l < r) {
      const m = l + Math.floor((r - l) / 2);

      if (arr[m] > n) {
        r = m;
      } else {
        l = m + 1;
      }
    }

    // Right-most duplicate
    while (
      r < arr.length &&
      (arr[r - 1] < n || arr[r] === arr[r - 1])
    ) r += 1; 

    return Math.max(0, r - 1);
  };