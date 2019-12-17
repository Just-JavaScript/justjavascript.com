require('dotenv').config()
const images = require('remark-images')
const emoji = require('remark-emoji')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [images, emoji],
  },
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  env: {
    CONVERTKIT_PUBLIC_KEY: process.env.CONVERTKIT_PUBLIC_KEY,
  },
})
