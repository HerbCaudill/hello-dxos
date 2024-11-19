import path from 'path'

export default {
  plugins: {
    tailwindcss: {
      config: path.join(path.dirname(new URL(import.meta.url).pathname), 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
}
