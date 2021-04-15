import alias from '@rollup/plugin-alias'
import autoExternal from 'rollup-plugin-auto-external'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'

// noinspection JSUnusedGlobalSymbols
export default {
    input: 'src/index.ts',
    output: [{
        name: 'SidePlayer',
        exports: 'default',
        globals: {
            vue: 'Vue',
        },
        sourcemap: false,
    }],
    external: ['vue'],
    plugins: [
        typescript({ check: false, sourceMap: false }),
        vue({ css: true, compileTemplate: true }),
        alias({ entries: [{ find: /^@\/(.+)/, replacement: './$1' }] }),
        commonjs(),
        autoExternal(),
    ]
}
