import * as array from './array.ts';

export type Cell = {
  i: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type CellOptions<T> = {
  /** If empty, equal to container width */
  width?: number | ((data: T, i: number, arr: T[]) => number | null);
  /** If true, cells do not fill container width */
  gap?: boolean;
  height: number | ((data: T, i: number, arr: T[]) => number);
};

export const cells = <T>(cell: CellOptions<T>) =>
  (container: { width: number }) =>
    (data: T[]): Cell[] => array.fill(data.length)<Cell>((i, arr) => {
      const prev = array.get(arr)(i - 1);
      const height = typeof cell.height === 'number' ?
        cell.height :
        cell.height(data[i], i, data);

      let width = typeof cell.width === 'number' ?
        cell.width :
        cell.width?.(data[i], i, data) ?? container.width;

      if (!cell.gap) {
        const rows = Math.max(1, Math.floor(container.width / width));
        width = Math.floor(container.width / rows); // Prevent float math
      }

      let x = (prev?.x ?? 0) + (prev?.width ?? 0);
      let y = prev?.y ?? 0;

      if (x + width > container.width) {
        x = 0;
        y += prev?.height ?? 0;
      }

      return { i, x, y, width, height };
    });

export const height = (cells: Cell[]): number =>
  (array.get(cells)(cells.length - 1)?.y ?? 0) +
  (array.get(cells)(cells.length - 1)?.height ?? 0);

export const view = (container: { height: number; y: number }) =>
  (cells: Cell[]): [min: number, max: number] => {
    const ly = cells.map(cell => cell.y);

    const min = array.bisectLeft(ly)(Math.max(0, container.y - container.height));
    const max = array.bisectRight(ly)(Math.min(height(cells), container.y + container.height));

    return [min, max];
  };
