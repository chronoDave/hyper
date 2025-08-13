export type Component<T> = (data: T) => Element;

export default <T>(key: (data: T) => string) =>
  (component: Component<T>) =>
    (root: Element) => {
      const cache = new Map<string, Element>();
      const index: Element[] = [];

      return (next: T[]): void => {
        const keys = next.map(key);
        if (next.length !== new Set(keys).size) throw new Error('Keys are not unique');

        const cur = Array.from(cache.keys());
        const fresh = next.reduce<string[]>((acc, cur, i) => {
          const k = keys[i];
          
          if (!cache.get(k)) {
            // Add new record
            const element = component(cur);

            cache.set(k, element);
            root.appendChild(element);
          } else {
            acc.push(k);
          }

          return acc;
        }, []);

        // Prune stale records
        cur.forEach(k => {
          if (!fresh.includes(k)) {
            cache.get(k)?.remove();
            cache.delete(k);
          }
        });

        // Re-order shuffled
      };
    };
