import logo from '../assets/logo.png';
import hero from '../assets/generated/hero-silk-amber.png';
import loungeWide from '../assets/line_oa_chat_261019_180323.jpg';
import loungeDepth from '../assets/line_oa_chat_261019_180326.jpg';
import entrance from '../assets/line_oa_chat_261019_180452.jpg';
import toast from '../assets/line_oa_chat_261019_185348.jpg';
import bottles from '../assets/line_oa_chat_261019_185350.jpg';
import anniversary from '../assets/line_oa_chat_261019_185352.jpg';
import seasonal from '../assets/line_oa_chat_261019_185353.jpg';
import systemSheet from '../assets/メニュー参考/line_oa_chat_261019_190909.jpg';
import champagneSheet from '../assets/メニュー参考/line_oa_chat_261019_190911.jpg';
import sakeSheet from '../assets/メニュー参考/line_oa_chat_261019_190913.jpg';
import whiskySheet from '../assets/メニュー参考/line_oa_chat_261019_190914.jpg';
import brandySheet from '../assets/メニュー参考/line_oa_chat_261019_190915.jpg';
import shochuSheet from '../assets/メニュー参考/line_oa_chat_261019_190917.jpg';
import foodSheet from '../assets/メニュー参考/line_oa_chat_261019_190918.jpg';

const addressParts = {
  country: 'JP',
  region: '千葉県',
  locality: '千葉市中央区',
  streetAddress: '富士見2-14-8',
};
const address = `${addressParts.region}${addressParts.locality}${addressParts.streetAddress}`;
const mapQuery = `Club シルクロード ${address} KICビルワン`;

export const shop = {
  name: 'Club シルクロード',
  phone: '043-225-8785',
  phoneHref: 'tel:0432258785',
  address,
  addressParts,
  building: 'KICビルワン 3F',
  hours: '20:00〜24:00',
  closed: '日曜日',
  holidayNote: '三連休の場合は日曜営業・月曜休業',
  seats: '30ボックス',
  stations: [{ name: '千葉中央駅', minutes: '3' }, { name: '千葉駅', minutes: '10' }],
  instagram: 'https://instagram.com/silkroad_mao',
  instagramHandle: '@silkroad_mao',
  line: 'https://lin.ee/OStCLNP',
  map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`,
  mapEmbed: `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed&hl=ja`,
};

export const assets = { logo, hero, loungeWide, loungeDepth, entrance, toast, bottles, anniversary, seasonal };
export const navigation = [
  { href: '#lounge', label: '店内について', en: 'LOUNGE' },
  { href: '#system', label: '料金のご案内', en: 'SYSTEM' },
  { href: '#menu', label: 'ドリンク・おつまみ', en: 'MENU' },
  { href: '#access', label: 'アクセス', en: 'ACCESS' },
];

export const system = {
  set: { label: '1セット', time: '60', price: '4,000', unit: '人' },
  extension: { label: '延長', time: '30', price: '2,000', unit: '人' },
  included: '焼酎 JINRO ／ ウイスキー ブラックニッカ',
  extras: [
    { label: 'カラオケ歌い放題', price: '1,000', unit: '卓', note: '' },
    { label: '同伴', price: '15,000', unit: '', note: '20:00〜22:00／2時間' },
    { label: '指名料', price: '2,000', unit: '', note: '' },
    { label: 'レディースドリンク', price: '1,000', unit: '', note: '' },
    { label: '梅干し付け放題', price: '1,000', unit: '', note: '' },
    { label: 'レモン付け放題', price: '1,000', unit: '', note: '' },
    { label: '炭酸', price: '1,000', unit: '', note: '何本飲んでも' },
    { label: 'コーラ', price: '1,000', unit: '', note: '' },
    { label: 'ホッピー', price: '1,000', unit: '', note: '' },
  ],
  taxNote: '表示価格は税別です。消費税10％をお会計時に頂戴します。',
  roundingNote: '料金表記載：消費税（千円未満四捨五入）。詳しいお会計についてはお問い合わせください。',
  ladiesNote: '女性のお客様は、セット料金・延長料金が半額となります。',
};

export const menuSheets = [
  { id: 'system', label: '料金表', image: systemSheet },
  { id: 'champagne', label: 'ワイン・シャンパン', image: champagneSheet },
  { id: 'sake', label: '日本酒・白酒', image: sakeSheet },
  { id: 'whisky', label: 'ウイスキー', image: whiskySheet },
  { id: 'brandy', label: 'ブランデー・レアなお酒', image: brandySheet },
  { id: 'shochu', label: '焼酎', image: shochuSheet },
  { id: 'food', label: 'おつまみ', image: foodSheet },
];

type MenuItem = readonly [name: string, price: string];
export type MenuGroup = {
  title: string;
  items: readonly MenuItem[];
};
export type MenuCategory = {
  id: string;
  en: string;
  title: string;
  groups: MenuGroup[];
  note?: string;
};

export const menuCategories: MenuCategory[] = [
  {
    id: 'wine', en: 'WINE & CHAMPAGNE', title: 'ワイン・シャンパン',
    note: '瓶ビールもご用意しています。料金はお問い合わせください。',
    groups: [{ title: '', items: [
      ['ワイン', '10,000'], ['シャンパン', '10,000'], ['BOTTEGA（ボッテガ）ロゼ', '12,000'],
      ['シルクロード LEDシャンパン', '20,000'], ['モエシャンドン 白', '23,000'],
      ['モエシャンドン ロゼ', '27,000'], ['モエシャンドン ネクター', '28,000'],
      ['紫鈴 rindo ワイン', '48,000'], ['ドンペリニヨン 白', '88,000'], ['ドンペリニヨン ロゼ', '150,000'],
    ] }],
  },
  {
    id: 'whisky', en: 'WHISKY & BRANDY', title: 'ウイスキー・ブランデー',
    groups: [
      { title: 'ウイスキー', items: [
        ['角瓶', '8,000'], ['シーバスリーガル 12年', '10,000'], ['ワイルドターキー 8年', '10,000'],
        ['メーカーズマーク レッド', '10,000'], ['オールドパー 12年', '12,000'], ['ローヤル', '12,000'],
        ['サントリー知多', '15,000'], ['タリスカー 10年', '15,000'], ['グレンフィディック 12年', '15,000'],
        ['メーカーズマーク レッド46', '16,000'], ['サントリー碧 Ao', '18,000'], ['宮城峡', '18,000'],
        ['余市', '18,000'], ['バランタイン 17年', '20,000'], ['IWハーパー 12年', '27,000'],
        ['ブラントン', '28,000'], ['竹鶴', '28,000'], ['白州', '33,000'], ['山崎', '35,000'],
        ['響', '38,000'], ['山崎 12年', '58,000'], ['ロイヤルハウスホールド', '66,000'], ['バランタイン 30年', '88,000'],
      ] },
      { title: 'ブランデー', items: [
        ['サントリーXO スリム', '10,000'], ['サントリーXO デラックス', '16,000'], ['ヘネシーXO', '58,000'],
      ] },
      { title: 'レアなお酒', items: [
        ['ラフロイグ セレクトカスク', '16,000'], ['クラガンモア 12年', '16,000'], ['カリラ 12年', '16,000'],
        ['ボウモア 12年', '16,000'], ['アードベッグ 10年', '18,000'], ['ザ・マッカラン ダブルカスク12年', '23,000'],
        ['竹鶴 12年', '88,000'], ['響 21年', '170,000'], ['響 17年', '180,000'], ['山崎 18年', '250,000'],
      ] },
    ],
  },
  {
    id: 'shochu-sake', en: 'SHOCHU & SAKE', title: '焼酎・日本酒・白酒',
    groups: [
      { title: '焼酎', items: [
        ['いいちこ', '8,000'], ['いいちこ（黒）', '8,000'], ['黒霧島', '8,000'], ['赤霧島', '8,000'],
        ['DAIYAME 芋焼酎', '8,000'], ['富乃宝山', '10,000'], ['一刻者', '10,000'], ['一刻者（赤）', '10,000'],
        ['中々 麦焼酎', '10,000'], ['二階堂 吉四六', '10,000'], ['千年の眠り', '10,000'], ['百年の孤独', '16,000'],
      ] },
      { title: '日本酒・白酒', items: [
        ['澪（みお）清酒 300ml', '4,000'], ['八海山', '8,000'], ['久保田千寿', '10,000'],
        ['作 純米大吟醸日本酒', '10,000'], ['白酒', '10,000'], ['貴州茅台酒 43度', '68,000'],
      ] },
    ],
  },
  {
    id: 'food', en: 'FOOD & FRUIT', title: 'おつまみ・フルーツ',
    groups: [
      { title: 'おつまみ', items: [
        ['チーズ', '1,000'], ['チョコレート', '1,000'], ['ポテトチップス', '1,000'], ['かっぱえびせん', '1,000'],
        ['ポッキー', '1,000'], ['レーズン', '1,000'], ['枝豆', '1,000'], ['そら豆', '1,000'], ['ポテトフライ', '1,000'],
        ['手作り水餃子', '1,000'], ['のり豚焼きパン（2個）', '1,000'], ['胡麻入りもち団子', '1,000'],
        ['辛いチキン／唐揚げ', '1,000'], ['焼き小籠包', '1,000'], ['辛いビーフン／麻辣湯', '2,000'],
        ['果物盛り合わせ（中）', '3,000'], ['果物盛り合わせ（大）', '5,000'],
      ] },
      { title: '中国名物', items: [
        ['雑穀米チップス', '1,000'], ['カボチャチップス', '1,000'], ['ひまわり種', '1,000'], ['スイカ種', '1,000'], ['干し魚', '1,000'],
      ] },
    ],
  },
];
