/**
 * PostCSS pipeline (Vite processes src/index.css through this on dev + build).
 *
 * Order matters:
 * 1. tailwindcss — @tailwind directives, @apply, tailwindcss-themer CSS variables
 * 2. autoprefixer — vendor prefixes from browserslist
 * 3. postcss-minify-selectors — production-only selector shortening (after generation)
 */
const isProd = process.env.NODE_ENV === "production";

/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    ...(isProd
      ? [
          require("postcss-minify-selectors")({
            convertToIs: true,
          }),
        ]
      : []),
  ],
}