import { plugins } from "@storeino/template-core";
export default {
  head: {
    title: 'starter-theme',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: []
  },
  target: 'server',
  css: [
    '~/assets/css/icons.css',
    '~/assets/css/main.css',
    '~/assets/css/fontCss.css'
  ],
  plugins: [
    ...plugins
  ],
  components: true,
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],
  modules: [
    '@nuxt/image',
    '@nuxtjs/axios'
  ],
  axios: {},
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  serverMiddleware: ['~/server/index'],
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  build: {
  }
}
