import type Env from './env.ts';

export const maybe = <T, K>(fn: (x: T) => K) =>
  (x?: T | null): K | null => {
    if (x === null || x === undefined) return null;
    return fn(x);
  };

export const debounce = (env: Env) =>
  <T>(fn: (...x: T[]) => void) => {
    let id: number;

    return (...x: T[]) => {
      if (id) env.window.cancelAnimationFrame(id);
      id = env.window.requestAnimationFrame(() => fn(...x));
    };
  };
