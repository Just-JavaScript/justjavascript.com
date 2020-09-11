module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-nested',
    ...(process.env.NODE_ENV === 'production' ? ['autoprefixer'] : []),
  ],
}
