export type Component<T> = (data: T) => Element;

export default <T>(component: Component<T>) =>
  (root: Element) => {
    const cache = new Map<T, Element>();
    
    return (next: T[]): void => {
      const refs = new WeakSet();

      /** Remove excess children in reverse order */
      while (root.children.length > next.length) root.lastChild?.remove();

      next.forEach((data, i) => {
        const child = root.children.item(i);
        let element = cache.get(data);

        /** If data is cached and unchanged, return */
        if (element === child) return; 

        /** Create and cache element */
        if (!element) {
          element = component(data);
          cache.set(data, element);
        }

        /** If data has duplicate entries, clone node */
        if (refs.has(element)) {
          element = element.cloneNode(true) as Element;
        } else {
          refs.add(element);
        }

        /** If child exists at current index replace with element, otherwise append element */
        if (child) {
          root.replaceChild(element, child);
        } else {
          root.appendChild(element);
        }
      });
    }
  }