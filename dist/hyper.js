const maybe = (fn) => (x) => {
  if (x === null || x === void 0) return null;
  return fn(x);
};

const attributes = (element) => (attributes2) => Object.entries(attributes2).forEach(([k, v]) => {
  if (typeof v === "string") element.setAttribute(k, v);
  if (typeof v === "number") element.setAttribute(k, `${v}`);
  if (v === true) element.toggleAttribute(k, v);
});

const create = (element) => (attributes$1) => (children) => {
  maybe(attributes(element))(attributes$1);
  element.append(...children);
  return element;
};
const html = (document) => (tag) => (attributes) => (...children) => create(document.createElement(tag))(attributes)(children);
const svg$1 = (document) => (tag) => (attributes) => (...children) => create(document.createElementNS("http://www.w3.org/2000/svg", tag))(attributes)(children);
const mathml$1 = (document) => (tag) => (attributes) => (...children) => create(document.createElementNS("http://www.w3.org/1998/Math/MathML", tag))(attributes)(children);
const xml$1 = (document) => (tag) => (attributes) => (...children) => create(document.createElementNS("http://www.w3.org/1999/xhtml", tag))(attributes)(children);

var list = (key) => (component) => (root) => {
  const cache = /* @__PURE__ */ new Map();
  return (next) => {
    const keys = next.map(key);
    if (next.length !== new Set(keys).size) throw new Error("Keys are not unique");
    const cur = Array.from(cache.keys());
    const cached = next.reduce((acc, cur2, i) => {
      const key2 = keys[i];
      const element = cache.get(key2) ?? component(cur2);
      if (!cache.has(key2)) {
        cache.set(key2, element);
      } else {
        acc.push(key2);
      }
      const child = root.children.item(i);
      if (child) {
        child.replaceWith(element);
      } else {
        root.appendChild(element);
      }
      return acc;
    }, []);
    cur.forEach((key2) => {
      if (!cached.includes(key2)) {
        cache.get(key2)?.remove();
        cache.delete(key2);
      }
    });
  };
};

const instance = /* @__PURE__ */ new Map();
if (typeof document !== "undefined") instance.set("document", document);
const env = (document2) => instance.set("document", document2);
var hyper = (tag) => html(instance.get("document"))(tag);
const svg = (tag) => svg$1(instance.get("document"))(tag);
const mathml = (tag) => mathml$1(instance.get("document"))(tag);
const xml = (tag) => xml$1(instance.get("document"))(tag);

export { hyper as default, env, list, mathml, svg, xml };
