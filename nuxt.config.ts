const path = require('path');
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: [
    { path: '~/components/', pathPrefix: false },
  ],
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL
    }
  },
  css: ["@/assets/main.sass"],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@import "@/assets/variables.sass"'
        },
      },
    },
  },
  nitro: {
    output: {
      publicDir: path.join(__dirname, '/docs')
    }
  },
  imports: {
    dirs: ['models']
  },
  app: {
    baseURL: process.env.BASE_URL
  },
  modules: [
    '@kevinmarrec/nuxt-pwa',
    '@davestewart/nuxt-scrollbar',
  ],
  pwa: {
    manifest: {
      name: 'Custom Counter',
      short_name: 'Custom Counter',
      theme_color: "#2db563",
      background_color: "#2db563",
      display: "fullscreen"
    }
  }
})
