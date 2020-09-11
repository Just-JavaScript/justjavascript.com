require('dotenv').config()
const images = require('remark-images')
const emoji = require('remark-emoji')
const unwrapImages = require('remark-unwrap-images')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [images, emoji, unwrapImages],
  },
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  env: {
    CONVERTKIT_PUBLIC_KEY: process.env.CONVERTKIT_PUBLIC_KEY,
    PASSWORD: process.env.PASSWORD,
  },
})
