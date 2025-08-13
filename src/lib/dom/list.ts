export type Component<T> = (data: T) => Element;

export default <T>(key: (data: T) => string) =>
  (component: Component<T>) =>
    (root: Element) => {
      const cache = new Map<string, Element>();
  
      return (next: T[]): void => {
        const keys = next.map(key);
        if (next.length !== new Set(keys).size) throw new Error('Keys are not unique');

        const cur = Array.from(cache.keys());
        const cached = next.reduce<string[]>((acc, cur, i) => {
          const key = keys[i];
          const element = cache.get(key) ?? component(cur);
          
          if (!cache.has(key)) {
            cache.set(key, element);
          } else {
            acc.push(key);
          }

          const child = root.children.item(i);
          if (child) {
            child.replaceWith(element)
          } else {
            root.appendChild(element);
          }

          return acc;
        }, []); // Cached elements

        cur.forEach(key => {
          // Remove orphaned cached elements
          if (!cached.includes(key)) {
            cache.get(key)?.remove();
            cache.delete(key);
          }
        });
      };
    };
