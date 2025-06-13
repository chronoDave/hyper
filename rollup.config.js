import fsp from 'fs/promises';
import path from 'path';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';

const input = 'src/hyper.ts';
const output = type => `dist/hyper.${type}`;

await fsp.rm(path.join(process.cwd(), 'dist'), {
  recursive: true,
  force: true
});

export default [{
  input,
  plugins: [
    esbuild({
      target: 'esnext'
    })
  ],
  output: [{
    file: output('js'),
    exports: 'auto',
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
