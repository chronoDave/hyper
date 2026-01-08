import { html, list } from './element.ts';

import dom from '../../test/dom.ts';

export default () => {
  const { document } = dom();
  const h = html(document);

  const ul = h('ul')()();
  const update = list<number>(n => h('li')()(`${n}`))(ul);
  update([1, 2, 2, 3]);

  return { ul, update };
};
