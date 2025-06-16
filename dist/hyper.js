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
var index = (document) => (tag) => (attributes) => (...children) => create(document.createElement(tag))(attributes)(children);
const svg = (document) => (tag) => (attributes) => (...children) => create(document.createElementNS("http://www.w3.org/2000/svg", tag))(attributes)(children);
const mathml = (document) => (tag) => (attributes) => (...children) => create(document.createElementNS("http://www.w3.org/1998/Math/MathML", tag))(attributes)(children);
const xml = (document) => (tag) => (attributes) => (...children) => create(document.createElementNS("http://www.w3.org/1999/xhtml", tag))(attributes)(children);

export { index as default, mathml, svg, xml };
