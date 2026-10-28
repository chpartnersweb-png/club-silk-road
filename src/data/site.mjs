// Keep the production origin shared by Astro, metadata and crawler endpoints.
export const siteConfig = Object.freeze({
  url: 'https://club-silk-road.pages.dev/',
  language: 'ja-JP',
  locale: 'ja_JP',
  ogImage: '/ogp.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
});

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).href;
}
