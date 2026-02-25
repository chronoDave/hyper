export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export const equals = (a: Json) =>
  (b: Json): boolean => {
    if (a === b) return true;

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;

      return a.every((v, i) => equals(v)(b[i]));
    }

    if (typeof a === 'object' && typeof b === 'object') {
      if (a === null || b === null) return false;
      if (Array.isArray(a) || Array.isArray(b)) return false;

      if (Object.keys(a).length !== Object.keys(b).length) return false;
      return Object.entries(a).every(([k, v]) => {
        if (!(k in b)) return false;
        return equals(b[k])(v);
      });
    }

    return false;
  };

export const clone = <T extends Json>(a: T): T => {
  if (a == null || typeof a !== 'object') return a; // Primitives
  if (Array.isArray(a)) {
    const b: Json = [];

    a.forEach((x, i) => {
      b[i] = clone(x);
    });

    return b as T;
  }
  if (typeof a === 'object') {
    const b: Json = {};

    Object.keys(a).forEach(k => {
      b[k] = clone(a[k]);
    });

    return b as T;
  }

  throw new Error('Failed to clone, invalid type');
};
