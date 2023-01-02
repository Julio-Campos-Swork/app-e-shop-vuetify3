/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import { router } from '@/routes/routes'
export function registerPlugins (app) {
  loadFonts()
  app
  .use(pinia)
  .use(vuetify)
  .use(router)
}
