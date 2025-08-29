export default class Env {
  private _document: Document | null;

  get document(): Document {
    if (!this._document) throw new Error('Missing document');
    return this._document;
  }

  set document(document: Document) {
    this._document = document;
  }
  
  constructor() {
    this._document = typeof document === 'undefined' ?
      null :
      document;
  }
}