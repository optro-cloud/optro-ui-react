import typescript from '@rollup/plugin-typescript';
import * as path from "path";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {getFiles} from "./scripts/utilities";
import babel from "@rollup/plugin-babel";
import scss from "rollup-plugin-scss";

const extensions = ['.js', '.ts', '.jsx', '.tsx', '.scss'];

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
        resolve(),
        commonjs(),
        babel(),
        typescript({
            tsconfig: './tsconfig.build.json',
            declaration: true,
            declarationDir: 'dist/dts'
        }),
        scss(),
        //dts({}),
        // terser({
        //     ecma: 6
        // }),
        // visualizer({
        //     filename: 'bundle-analysis.html',
        //     open: true,
        // }),
    ],
    external: ['react', 'react-dom', 'tslib'],
};
