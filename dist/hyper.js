const maybe = (fn) => (x) => {
  if (x === null || x === void 0) return null;
  return fn(x);
};

const attributes = (element) => (attributes2) => Object.entries(attributes2).forEach(([k, v]) => {
  if (typeof v === "string") element.setAttribute(k, v);
  if (typeof v === "number") element.setAttribute(k, `${v}`);
  if (v === true) element.toggleAttribute(k, v);
});

const init = (document2) => ({
  create: (element) => (attributes$1) => (children) => {
    const root = element(document2);
    maybe(attributes(root))(attributes$1);
    root.append(...children);
    return root;
  }
});
let hyper = typeof document !== "undefined" ? init(document) : null;
const env = (document2) => {
  hyper = init(document2);
};
var hyper$1 = (tag) => (attributes) => (...children) => {
  if (!hyper) throw new Error("Missing env");
  return hyper.create((document2) => document2.createElement(tag))(attributes)(children);
};
const svg = (tag) => (attributes) => (...children) => {
  if (!hyper) throw new Error("Missing env");
  return hyper.create((document2) => document2.createElementNS("http://www.w3.org/2000/svg", tag))(attributes)(children);
};
const mathml = (tag) => (attributes) => (...children) => {
  if (!hyper) throw new Error("Missing env");
  return hyper.create((document2) => document2.createElementNS("http://www.w3.org/1998/Math/MathML", tag))(attributes)(children);
};
const xml = (tag) => (attributes) => (...children) => {
  if (!hyper) throw new Error("Missing env");
  return hyper.create((document2) => document2.createElementNS("http://www.w3.org/1999/xhtml", tag))(attributes)(children);
};

export { hyper$1 as default, env, mathml, svg, xml };
