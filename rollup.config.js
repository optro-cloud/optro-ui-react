import scss from 'rollup-plugin-scss';
import typescript from '@rollup/plugin-typescript';
import * as path from "path";
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: [path.join(__dirname, "src", "license-status", "LicenseStatus.tsx"),
        path.join(__dirname, "src", "license-provider", "LicenseProvider.tsx"),
        path.join(__dirname, "src", "license-conditional", "LicenseConditional.tsx"),
        path.join(__dirname, "src", "use-license", "useLicense.ts"),
        path.join(__dirname, "src", "trello-provider", "TrelloProvider.tsx"),
        path.join(__dirname, "src", "use-trello-api", "useProvidedTrello.ts"),
        path.join(__dirname, "src", "use-trello-api", "useTrelloApi.ts"),
    ],
    output: [
        {
            dir: "dist",
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
            strict: false
        }
    ],
    plugins: [
        babel({ exclude: 'node_modules/**', babelHelpers: "bundled" }),
        resolve(),
        scss(),
        typescript(),
        commonjs()
    ],
    external: ['react', 'react-dom']
}
