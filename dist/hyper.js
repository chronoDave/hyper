class Env {
  _document;
  _window;
  get document() {
    if (!this._document) throw new Error("Missing document");
    return this._document;
  }
  set document(document2) {
    this._document = document2;
  }
  get window() {
    if (!this._window) throw new Error("Missing window");
    return this._window;
  }
  set window(window2) {
    this._window = window2;
  }
  constructor() {
    this._document = typeof document === "undefined" ? null : document;
    this._window = typeof window === "undefined" ? null : window;
  }
}

const maybe = (fn) => (x) => {
  if (x === null || x === void 0) return null;
  return fn(x);
};
const debounce = (env) => (fn) => {
  let id;
  return (...x) => {
    if (id) env.window.cancelAnimationFrame(id);
    id = env.window.requestAnimationFrame(() => fn(...x));
  };
};

const get = (arr) => (i) => arr[i] ?? null;
const fill = (n) => (fn) => {
  const arr = Array.from({ length: n });
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = fn(i, arr);
  }
  return arr;
};
const bisectLeft = (arr) => (n) => {
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
  while (l > 0 && (arr[l] > n || arr[l - 1] === arr[l])) l -= 1;
  return Math.min(arr.length - 1, l);
};
const bisectRight = (arr) => (n) => {
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
  while (r < arr.length && (arr[r - 1] < n || arr[r] === arr[r - 1])) r += 1;
  return Math.max(0, r - 1);
};

const cells = (cell) => (container) => (data) => fill(data.length)((i, arr) => {
  const prev = get(arr)(i - 1);
  const height2 = typeof cell.height === "number" ? cell.height : cell.height(data[i], i, data);
  let width = container.width;
  if (typeof cell.width === "number") width = cell.width;
  if (typeof cell.width === "function") width = cell.width(data[i], i, data) ?? container.width;
  if (!cell.gap) {
    const rows = Math.max(1, Math.floor(container.width / width));
    width = Math.floor(container.width / rows);
  }
  let x = (prev?.x ?? 0) + (prev?.width ?? 0);
  let y = prev?.y ?? 0;
  if (x + width > container.width) {
    x = 0;
    y += prev?.height ?? 0;
  }
  return { i, x, y, width, height: height2 };
});
const height = (cells2) => (get(cells2)(cells2.length - 1)?.y ?? 0) + (get(cells2)(cells2.length - 1)?.height ?? 0);
const view = (container) => (cells2) => {
  const ly = cells2.map((cell) => cell.y);
  const min = bisectLeft(ly)(Math.max(0, container.y - container.height));
  const max = bisectRight(ly)(Math.min(height(cells2), container.y + container.height));
  return [min, max];
};

const equals = (a) => (b) => {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => equals(v)(b[i]));
  }
  if (typeof a === "object" && typeof b === "object") {
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
const clone = (a) => {
  if (a == null || typeof a !== "object") return a;
  if (Array.isArray(a)) {
    const b = [];
    a.forEach((x, i) => {
      b[i] = clone(x);
    });
    return b;
  }
  if (typeof a === "object") {
    const b = {};
    Object.keys(a).forEach((k) => {
      b[k] = clone(a[k]);
    });
    return b;
  }
  throw new Error("Failed to clone, invalid type");
};

const set = (element) => (attributes) => Object.entries(attributes).forEach(([k, v]) => {
  if (typeof v === "string") element.setAttribute(k, v);
  if (typeof v === "number") element.setAttribute(k, `${v}`);
  if (v === true) element.toggleAttribute(k, v);
});
const style = (element) => (style2) => Object.entries(style2).forEach(([k, v]) => {
  element.style.setProperty(k, v);
});
const create = (element) => (attributes) => (children) => {
  maybe(set(element))(attributes);
  element.append(...children);
  return element;
};
const html = (env) => (tag) => (attributes) => (...children) => {
  const root = create(env.document.createElement(tag))(attributes)(children);
  maybe(style(root))(attributes?.style);
  return root;
};
const svg$1 = (env) => (tag) => (attributes) => (...children) => create(env.document.createElementNS("http://www.w3.org/2000/svg", tag))(attributes)(children);
const mathml$1 = (env) => (tag) => (attributes) => (...children) => create(env.document.createElementNS("http://www.w3.org/1998/Math/MathML", tag))(attributes)(children);
const xml$1 = (env) => (tag) => (attributes) => (...children) => create(env.document.createElementNS("http://www.w3.org/1999/xhtml", tag))(attributes)(children);
const list$1 = (render) => (root) => {
  let cache = [];
  return (next) => {
    while (root.children.length > next.length) root.lastChild?.remove();
    next.forEach((x, i) => {
      if (i < cache.length && equals(x)(cache[i])) return;
      const element = render(x, i, next);
      const child = root.children.item(i);
      if (child) {
        root.replaceChild(element, child);
      } else {
        root.appendChild(element);
      }
    });
    cache = clone(next);
  };
};
const virtual$1 = (env) => (cell) => (render) => (root) => {
  style(root)({
    "position": "relative",
    "max-height": "100%",
    "overflow-y": "scroll"
  });
  let cache = [];
  let state = [];
  const update = debounce(env)((full) => {
    if (full) cache = cells(cell)({ width: root.getBoundingClientRect().width })(state);
    const [min, max] = view({
      height: root.getBoundingClientRect().height,
      y: Math.floor(root.scrollTop)
    })(cache);
    const spacer = html(env)("div")({
      "aria-hidden": "true",
      "style": {
        "width": "100%",
        "height": `${height(cache)}px`,
        "z-index": "-1"
      }
    })();
    root.replaceChildren(...cache.slice(min, max + 1).map((cell2, j) => {
      const child = render(state[cell2.i], { real: cell2.i, virtual: j }, state);
      style(child)({
        position: "absolute",
        transform: `translate(${cell2.x}px, ${cell2.y}px)`,
        width: `${cell2.width}px`,
        height: `${cell2.height}px`
      });
      return child;
    }), spacer);
  });
  root.addEventListener("scroll", () => update(false), { passive: true });
  env.window.addEventListener("resize", () => update(true), { passive: true });
  return {
    update: (next) => {
      state = next;
      update(true);
    },
    scrollTo: (i) => {
      const y = get(cache)(i)?.y;
      if (typeof y !== "number") return;
      root.scrollTop = y;
    }
  };
};

const env = new Env();
var hyper = html(env);
const svg = svg$1(env);
const mathml = mathml$1(env);
const xml = xml$1(env);
const list = list$1;
const virtual = virtual$1(env);

export { hyper as default, env, list, mathml, svg, virtual, xml };
