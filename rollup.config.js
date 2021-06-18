<<<<<<< HEAD
=======
import peerDepsExternal from "rollup-plugin-peer-deps-external";
>>>>>>> 0347a0d44c499e4ef91c5310fd593d8c4ac0a960
import typescript from '@rollup/plugin-typescript';
import * as path from "path";
import visualizer from 'rollup-plugin-visualizer';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
<<<<<<< HEAD
import {getFiles} from "./scripts/utilities";
import dts from "rollup-plugin-dts";
import scss from 'rollup-plugin-scss'
import babel from "@rollup/plugin-babel";

const extensions = ['.js', '.ts', '.jsx', '.tsx', '.scss'];
=======
import postcss from "rollup-plugin-postcss";
>>>>>>> 0347a0d44c499e4ef91c5310fd593d8c4ac0a960

export default {
    input: [
        path.join(__dirname, "src", "index.ts"),
        ...getFiles(path.join(__dirname, "src", "common"), extensions),
        ...getFiles(path.join(__dirname, "src", "components"), extensions),
        ...getFiles(path.join(__dirname, "src", "hooks"), extensions),
        ...getFiles(path.join(__dirname, "src", "types"), extensions)
    ],
    output: {
        dir: 'dist',
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
    },
    plugins: [
<<<<<<< HEAD
        resolve(),
        commonjs(),
        babel(),
        typescript({
            tsconfig: './tsconfig.build.json',
            declaration: true,
            declarationDir: 'dist',
        }),
        scss(),
        //dts({}),
        // terser({
        //     ecma: 6
        // }),
        visualizer({
            filename: 'bundle-analysis.html',
            open: true,
        }),
=======
        peerDepsExternal(),
        postcss({
            extract: false,
            modules: true,
            use: ['sass'],
        }),
        resolve(),
        babel({ exclude: 'node_modules/**', babelHelpers: "bundled" }),
        commonjs(),
        typescript()
>>>>>>> 0347a0d44c499e4ef91c5310fd593d8c4ac0a960
    ],
    external: ['react', 'react-dom'],
};
