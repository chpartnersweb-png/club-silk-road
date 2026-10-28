import { shop } from './silkroad';
import { absoluteUrl, siteConfig } from './site.mjs';

const station = shop.stations[0];
const stationText = shop.stations.map(item => `${item.name}徒歩${item.minutes}分`).join('、');

export const seo = {
  title: `${shop.name}｜千葉・富士見、${station.name}徒歩${station.minutes}分`,
  description: `千葉市中央区富士見の${shop.name}。${stationText}、${shop.building}。店内写真、料金、ドリンク・おつまみ、アクセスをご案内。営業時間${shop.hours}、定休日は${shop.closed}（${shop.holidayNote}）。お問い合わせは電話・公式LINEへ。`,
  language: siteConfig.language,
  locale: siteConfig.locale,
  robots: 'index, follow, max-image-preview:large',
  image: absoluteUrl(siteConfig.ogImage),
  imageAlt: `${shop.name} 公式ロゴ`,
  ids: {
    business: absoluteUrl('/#business'),
    website: absoluteUrl('/#website'),
    webpage: absoluteUrl('/#webpage'),
    primaryImage: absoluteUrl('/#primaryimage'),
    logo: absoluteUrl('/#logo'),
  },
};
