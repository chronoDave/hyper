export default class Env {
  private _document: Document | null;
  private _window: Window | null;

  get document(): Document {
    if (!this._document) throw new Error('Missing document');
    return this._document;
  }

  set document(document: Document) {
    this._document = document;
  }

  get window(): Window {
    if (!this._window) throw new Error('Missing window');
    return this._window;
  }

  set window(window: Window) {
    this._window = window;
  }
  
  constructor() {
    this._document = typeof document === 'undefined' ?
      null :
      document;
    this._window = typeof window === 'undefined' ?
      null :
      window;
  }
}