const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
for (const width of [320,375,390,768,1440]) {
 test(`responsive and accessible at ${width}`,async({page})=>{
  await page.setViewportSize({width,height:900});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');await expect(page.locator('#song-count')).toContainText('130 songs');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  expect(await page.locator('h1').evaluate(e=>e.getBoundingClientRect().bottom)).toBeLessThan(900);
  expect(await page.locator('.hero .button').evaluate(e=>e.getBoundingClientRect().bottom)).toBeLessThan(900);
  expect(await page.locator('iframe').count()).toBe(0);
  if(width<601){await page.getByRole('button',{name:'Menu'}).click();await expect(page.locator('#nav')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('#nav')).toBeHidden();}
  const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(results.violations).toEqual([]);
  expect(errors).toEqual([]);
  await page.screenshot({path:`test-results/home-${width}.png`,fullPage:true});
 });
}
test('search, filters, expansion, video consent and keyboard',async({page})=>{
 await page.goto('/');await expect(page.locator('#song-count')).toContainText('130');
 await page.locator('#song-search').fill('INXS');await expect(page.locator('.song')).toHaveCount(4);
 await page.getByRole('button',{name:'Chilled set',exact:true}).click();await expect(page.locator('#song-count')).toContainText('No songs');
 await page.locator('#song-search').fill('');await expect(page.locator('#song-count')).toContainText('36 songs');
 await page.getByRole('button',{name:'Show more songs'}).click();await expect(page.locator('.song')).toHaveCount(36);
 await page.route('https://www.youtube-nocookie.com/**',route=>route.fulfill({status:200,body:'<html><title>Mock video</title></html>'}));
 await page.getByRole('button',{name:"Play Urban Groove performing It's My Life",exact:true}).click();await expect(page.locator('iframe')).toHaveAttribute('src',/VW291rpbk9c/);
 await page.getByRole('button',{name:'Play Urban Groove performing Shut Up And Dance',exact:true}).click();await expect(page.locator('iframe').nth(1)).toHaveAttribute('src',/y1EKChxEzug/);
 await page.goto('/');await page.keyboard.press('Tab');await expect(page.getByText('Skip to content')).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('#main')).toBeFocused();
 await page.emulateMedia({reducedMotion:'reduce'});expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

test('authentic logo and all three approved photographs load',async({page})=>{
 await page.goto('/');
 await expect(page.locator('.hero-logo')).toHaveAttribute('src','assets/urban-groove-logo.webp');
 await expect(page.locator('.record-art,.vinyl,.band-graphic')).toHaveCount(0);
 for(const name of ['backdrop','stage','graffiti']){
  const photo=page.locator(`img[src="assets/band-${name}.webp"]`);
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toBeVisible();
  await expect.poll(()=>photo.evaluate(i=>i.complete&&i.naturalWidth>0)).toBeTruthy();
 }
 await expect(page.locator('#book a').first()).toHaveAttribute('href',/artist_ids=5795/);
});
