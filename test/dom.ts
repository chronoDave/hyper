import { JSDOM } from 'jsdom';

export default (html?: string) => {
  const dom = new JSDOM(html ?? '');

  return {
    window: dom.window,
    document: dom.window.document
  };
};
