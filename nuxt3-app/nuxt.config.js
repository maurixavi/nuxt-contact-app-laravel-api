import eslintVitePlugin from 'vite-plugin-eslint'

export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  googleFonts: {
    families: {
      Roboto: true,
      Inter: [400, 500, 600, 700, 800, 900],
      'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
    },
  },
  vite: {
    plugins: [
      eslintVitePlugin({
        include: ['./**/*.vue', './**/*.js'],
      }),
    ],
  },
  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME,
      appUrl: process.env.APP_URL,
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
  router: {
    middleware: 'authenticated',
  },
})
