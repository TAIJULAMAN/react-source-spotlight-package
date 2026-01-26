import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default [
    // React component build
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
                sourcemap: true,
                exports: 'named'
            },
            {
                file: 'dist/index.esm.js',
                format: 'esm',
                sourcemap: true
            }
        ],
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        plugins: [
            resolve(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                declaration: true,
                declarationDir: 'dist',
                rootDir: 'src'
            }),
            postcss({
                extract: 'spotlight.css',
                minimize: true,
                sourceMap: true
            })
        ]
    },
    // CLI build
    {
        input: 'src/cli/generator.ts',
        output: {
            file: 'dist/cli/generator.js',
            format: 'cjs',
            sourcemap: true
        },
        external: ['fs', 'path', 'glob', 'chalk', 'commander'],
        plugins: [
            typescript({
                tsconfig: './tsconfig.json'
            })
        ]
    }
];
