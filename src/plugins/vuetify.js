import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    themes: {
      light: {
        background: "#F9FAFB",
        primary: "#EA580C",
        primary400: "#F97316",
        accent800: "#065F46",
        slate500: "64748B",
        slate300: "#CBD5E1",
        slate200: "#E2E8F0",
        gray900: "#111827",
        gray700: "#374151",
        gray50: "#F9FAFB",
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
});
