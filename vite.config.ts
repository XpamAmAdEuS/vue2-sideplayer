import { defineConfig } from 'vite'
const { createVuePlugin } = require("vite-plugin-vue2");
const path = require('path')

export default defineConfig({
  plugins: [createVuePlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'sideplayer'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue','wavesurfer.js','mitt','wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          'wavesurfer.js' :'wavesurfer.js',
          'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js' : 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js'
        }
      }
    }
  }
})

