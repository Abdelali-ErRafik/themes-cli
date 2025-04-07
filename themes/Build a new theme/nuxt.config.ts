export default defineNuxtConfig({
  compatibilityDate: '2024-12-27',
  devtools: { enabled: true },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    optimizeDeps: {
      exclude: ['https'],
    },
  },

  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
    cdnURL: 'https://themes.storeino.world/marketmall/',
    head: {
      title: 'marketmall-theme',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [],
    },
  },

  css: [
    '~/assets/css/main.css',
    '~/assets/css/icons.css',
    '~/assets/css/fonts.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    'nuxt-swiper',
    '@sentry/nuxt',
  ],
  googleFonts: {
    display: 'swap',
    prefetch: true,
    preconnect: true,
    useStylesheet: true,
    families: {
      Tajawal: [300, 400, 500, 700, 800, 900],
    },
  },

  sentry: {
    dsn: 'https://0cad4d77eac153a166f0a458742128d0@logs2.storeino.com/39',
    tracing: true,
    debug: 'development',
    environment: 'development',
    tracesSampleRate: 1.0,
    logLevel: 'debug',
  },

  plugins: [
    '~/plugins/tools.ts',
    '~/plugins/http.ts',
    '~/plugins/storeino.ts',
    '~/plugins/init.ts',
    '~/plugins/events.ts',
    '~/plugins/pixels.ts',
  ],

  components: {
    dirs: ['~/components'],
  },

  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },

  build: {
    transpile: ['entities', '@vue/runtime-core', '@vue/compat'],
  },
});
