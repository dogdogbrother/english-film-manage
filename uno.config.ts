import { defineConfig, presetUno } from 'unocss'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'
import presetAttributify from '@unocss/preset-attributify'
import presetRemToPx from '@unocss/preset-rem-to-px'
export default defineConfig({
  presets: [
    presetRemToPx(),
    presetUno(),
    presetAttributify(),
  ],
  transformers: [
    transformerAttributifyJsx(),
  ],
})