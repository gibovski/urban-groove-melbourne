const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
const base='https://gibovski.github.io/urban-groove-melbourne/';
test('indexable HTML, metadata, schema, sitemap and local link integrity',async({page,request})=>{
 await page.goto('/');
 await expect(page).toHaveTitle('Urban Groove | Melbourne Cover Band for Weddings & Events');
 await expect(page.locator('h1')).toHaveCount(1);
 await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href',base);
 const schema=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
 expect(schema['@type']).toBe('MusicGroup');expect(schema.areaServed.name).toBe('Melbourne');expect(schema.url).toBe(base);
 expect(schema).not.toHaveProperty('aggregateRating');expect(schema).not.toHaveProperty('review');
 for(const key of ['og:title','og:description','og:url','og:image','og:image:alt']) expect(await page.locator(`meta[property="${key}"]`).getAttribute('content')).toBeTruthy();
 for(const key of ['twitter:card','twitter:title','twitter:description','twitter:image','twitter:image:alt']) expect(await page.locator(`meta[name="${key}"]`).getAttribute('content')).toBeTruthy();
 const links=await page.locator('a[href],img[src],script[src],link[rel=stylesheet]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')||n.getAttribute('src')));
 for(const href of new Set(links)) {
  if(href.startsWith('#')) expect(await page.locator(href).count(),href).toBe(1);
  else if(!/^https?:/.test(href)) expect((await request.get('/'+href)).status(),href).toBe(200);
 }
 const xml=fs.readFileSync('sitemap.xml','utf8');
 expect(xml.match(/<loc>/g)).toHaveLength(2);
 expect(xml).toContain(base+'docs/sources.html');
 expect(fs.readFileSync('robots.txt','utf8')).toContain('Sitemap: '+base+'sitemap.xml');
});
test('all sourced songs and mobile navigation remain available without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:900}});
 const page=await context.newPage();await page.goto('/');
 await expect(page.locator('.song')).toHaveCount(130);
 await expect(page.locator('#nav')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await context.close();
});
