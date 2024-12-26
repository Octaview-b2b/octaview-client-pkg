import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/octaview-client.jsx',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: true,
    exports: 'auto', // Explicitly set exports mode
  },
  plugins: [
    resolve({
      extensions: ['.js', '.jsx'],  // Add '.jsx' here to resolve JSX files
    }),
    commonjs(),
    postcss(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }),
    terser(),
  ],
  external: ['react', 'react-dom'],
};
