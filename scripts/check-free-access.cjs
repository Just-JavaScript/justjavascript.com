const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const base = process.argv[2] || 'http://127.0.0.1:3000'
const forbidden = /buy now|buy just javascript|restore purchases|log in to continue|sign in to continue|href=["'][^"']*(?:\/buy|\/login|checkout)/i

async function page(route) {
  // No cookie, authorization header, or redirect following.
  return fetch(new URL(route, base), { redirect: 'manual' })
}

async function main() {
  for (const directory of ['content', 'content/quiz']) {
    const prefix = directory === 'content' ? '/learn' : '/quiz'
    const files = fs.readdirSync(directory).filter((file) => file.endsWith('.mdx'))
    for (const file of files) {
      const route = `${prefix}/${path.basename(file, '.mdx')}`
      const response = await page(route)
      assert.equal(response.status, 200, route)
      assert.equal(response.headers.get('set-cookie'), null, route)
      const html = await response.text()
      assert.ok(!forbidden.test(html), `${route}: commerce/login CTA found`)
      assert.match(html, /<h1[^>]*>[^<]+/, `${route}: missing heading`)
      if (prefix === '/learn') {
        const article = html.match(/<main class="mx-auto prose md:prose-lg">([\s\S]*?)<\/main>/)?.[1]
        assert.ok(article, `${route}: missing lesson body`)
        assert.ok(article.replace(/<[^>]*>/g, '').length > 500, `${route}: lesson body too short`)
        assert.match(article, /<p[ >]/, `${route}: missing lesson paragraphs`)
      }
      console.log(`PASS anonymous 200, heading/body present, no commerce/login CTA: ${route}`)
    }
  }
  for (const route of ['/', '/learn']) {
    const response = await page(route)
    assert.equal(response.status, 200, route)
    assert.ok(!forbidden.test(await response.text()), route)
    console.log(`PASS public landing/index: ${route}`)
  }
  for (const route of ['/buy', '/login', '/invoice', '/thanks', '/redirect', '/the-javascript-universe', '/confirm/free-episode']) {
    const response = await page(route)
    assert.equal(response.status, 307, route)
    const destination = response.headers.get('location')
    assert.ok(destination.startsWith('/learn'), `${route}: ${destination}`)
    console.log(`PASS content redirect: ${route} -> ${destination}`)
  }
  for (const route of ['/learn/not-a-lesson', '/quiz/not-a-quiz']) {
    assert.equal((await page(route)).status, 404, route)
    console.log(`PASS unknown slug: ${route}`)
  }
  for (const route of ['/api/answer', '/api/get-progress', '/api/set-progress', '/api/subscriber', '/api/convertkit/subscribe']) {
    assert.equal((await page(route)).status, 410, route)
    console.log(`PASS retired service: ${route}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
