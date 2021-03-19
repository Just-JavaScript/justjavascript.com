require('dotenv-flow').config()

module.exports = {
  siteUrl: `https://justjavascript.com`,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ['/*'],
}
