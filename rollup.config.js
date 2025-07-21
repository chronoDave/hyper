import fsp from 'fs/promises';
import path from 'path';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';

const input = 'src/hyper.ts';
const outdir = path.join(process.cwd(), 'dist');
const output = type => `${outdir}/hyper.${type}`;

await fsp.rm(outdir, { recursive: true, force: true });

export default [{
  input,
  plugins: [esbuild({ target: 'esnext' })],
  output: [{
    file: output('js'),
    format: 'es'
  }]
}, {
  input,
  plugins: [dts()],
  output: {
    file: output('d.ts'),
    format: 'es'
  }
}];
