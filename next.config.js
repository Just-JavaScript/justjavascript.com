require('dotenv').config()
const images = require('remark-images')
const emoji = require('remark-emoji')
const unwrapImages = require('remark-unwrap-images')
const withImages = require(`next-images`)
const withSvgr = require(`next-svgr`)
const withPlugins = require('next-compose-plugins')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [images, emoji, unwrapImages],
  },
})

const IMAGE_HOST_DOMAINS = [
  'res.cloudinary.com',
  'hardcore-golick-433858.netlify.app',
]

const nextConfig = {
  env: {
    CONVERTKIT_PUBLIC_KEY: process.env.CONVERTKIT_PUBLIC_KEY,
    PASSWORD: process.env.PASSWORD,
  },
  images: {
    domains: IMAGE_HOST_DOMAINS,
  },
  async redirects() {
    return []
  },
}

module.exports = withPlugins(
  [
    withSvgr,
    withImages(),
    withMDX({
      pageExtensions: ['js', 'jsx', 'md', 'mdx'],
    }),
  ],
  nextConfig
)
