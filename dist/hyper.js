const maybe = (fn) => (x) => {
  if (x === null || x === void 0) return null;
  return fn(x);
};

const set = (element) => (attributes) => Object.entries(attributes).forEach(([k, v]) => {
  if (typeof v === "string") element.setAttribute(k, v);
  if (typeof v === "number") element.setAttribute(k, `${v}`);
  if (typeof v === "boolean") element.setAttribute(k, `${v}`);
});
const html = (document) => (tag) => (attributes) => (...children) => {
  const root = document.createElement(tag);
  maybe(set(root))(attributes);
  root.append(...children);
  return root;
};
const create = (element) => (attributes) => (...children) => {
  const root = element();
  maybe(set(root))(attributes);
  root.append(...children);
  return root;
};
const svg = (document) => (tag) => create(() => document.createElementNS("http://www.w3.org/2000/svg", tag));
const mathml = (document) => (tag) => create(() => document.createElementNS("http://www.w3.org/1998/Math/MathML", tag));
const xml = (document) => (tag) => create(() => document.createElementNS("http://www.w3.org/1999/xhtml", tag));

export { html as default, mathml, svg, xml };
