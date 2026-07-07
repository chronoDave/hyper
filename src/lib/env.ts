export default class Env {
  #document: Document | null;
  #window: Window | null;

  get document(): Document {
    if (!this.#document) throw new Error('Missing document');
    return this.#document;
  }

  set document(document: Document) {
    this.#document = document;
  }

  get window(): Window {
    if (!this.#window) throw new Error('Missing window');
    return this.#window;
  }

  set window(window: Window) {
    this.#window = window;
  }

  constructor() {
    this.#document = typeof document === 'undefined' ?
      null :
      document;
    this.#window = typeof window === 'undefined' ?
      null :
      window;
  }
}
