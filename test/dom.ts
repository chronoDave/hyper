import { JSDOM } from 'jsdom';

export type DomOptions = {
  html?: string;
  visual?: boolean;
};

export default (options?: DomOptions) => {
  const dom = new JSDOM(options?.html ?? '', { pretendToBeVisual: options?.visual });

  return {
    window: dom.window as unknown as Window,
    document: dom.window.document
  };
};
