const maybe = (fn) => (x) => {
  if (x === null || x === void 0) return null;
  return fn(x);
};

const setAttributes = (element) => (attributes) => Object.entries(attributes).forEach(([k, v]) => {
  if (typeof v === "string") element.setAttribute(k, v);
  if (typeof v === "number") element.setAttribute(k, `${v}`);
  if (v === true) element.toggleAttribute(k, v);
});
const create = (element) => (attributes) => (children) => {
  maybe(setAttributes(element))(attributes);
  element.append(...children);
  return element;
};
const html = (document) => (tag) => (attributes) => (...children) => create(document.createElement(tag))(attributes)(children);
const svg$1 = (document) => (tag) => (attributes) => (...children) => create(document.createElementNS("http://www.w3.org/2000/svg", tag))(attributes)(children);
const mathml$1 = (document) => (tag) => (attributes) => (...children) => create(document.createElementNS("http://www.w3.org/1998/Math/MathML", tag))(attributes)(children);
const xml$1 = (document) => (tag) => (attributes) => (...children) => create(document.createElementNS("http://www.w3.org/1999/xhtml", tag))(attributes)(children);
const list$1 = (component) => (root) => {
  const cache = /* @__PURE__ */ new Map();
  return (next) => {
    const refs = /* @__PURE__ */ new WeakSet();
    while (root.children.length > next.length) root.lastChild?.remove();
    next.forEach((data, i) => {
      const child = root.children.item(i);
      let element = cache.get(data);
      if (element === child) return;
      if (!element) {
        element = component(data);
        cache.set(data, element);
      }
      if (refs.has(element)) {
        element = element.cloneNode(true);
      } else {
        refs.add(element);
      }
      if (child) {
        root.replaceChild(element, child);
      } else {
        root.appendChild(element);
      }
    });
  };
};

class Env {
  _document;
  get document() {
    if (!this._document) throw new Error("Missing document");
    return this._document;
  }
  set document(document2) {
    this._document = document2;
  }
  constructor() {
    this._document = typeof document === "undefined" ? null : document;
  }
}

const env = new Env();
var hyper = (tag) => html(env.document)(tag);
const svg = (tag) => svg$1(env.document)(tag);
const mathml = (tag) => mathml$1(env.document)(tag);
const xml = (tag) => xml$1(env.document)(tag);
const list = list$1;

export { hyper as default, env, list, mathml, svg, xml };
