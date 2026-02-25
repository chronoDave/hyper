import esbuild from 'esbuild';
import puppeteer, { ElementHandle } from 'puppeteer-core';

export type BrowserOptions = {
  show?: boolean;
};

export default async (script: string, options?: BrowserOptions) => {
  const [result, browser] = await Promise.all([
    esbuild.build({
      entryPoints: ['src/hyper.ts'],
      write: false,
      bundle: true,
      format: 'iife',
      globalName: 'window.hyper',
      minify: true,
      outfile: 'hyper.js'
    }),
    puppeteer.launch({ executablePath: process.env.BROWSER_PATH, headless: !options?.show })
  ]);

  const page = await browser.newPage();

  await page.setContent([
    '<!DOCTYPE html><html><head><style>*, *::before, *::after { box-sizing: border-box; padding: 0; margin: 0; }</style></head><body>',
    `<script>${result.outputFiles[0].text}</script>`,
    `<script>${script}</script>`,
    '</body></html>'
  ].join(''));

  return { page, close: async () => browser.close() };
};
