# Club シルクロード SEO設定

2026年10月28日。指定された公開URLを基準にローカルのソースへ実装。

## 正規URL

`https://club-silk-road.pages.dev/`

共通設定は`src/data/site.mjs`。Astroのsite、canonical、OGP/Xの画像URL、構造化データ内のURL、robots.txtのサイトマップ案内、サイトマップのURLに使用。

## メタ情報

- タイトル：Club シルクロード｜千葉・富士見、千葉中央駅徒歩3分
- 説明文：正式店名、所在地、2駅からの徒歩、店内・料金・メニュー・アクセス、営業時間と定休日の例外、問い合わせ先を提供情報から記載。
- robots：`index, follow, max-image-preview:large`
- canonical：URLのパスを共通の本番URLに解決。検索パラメータやハッシュを含めない。
- OGP：日本語、正式店名、タイトル・説明文、canonicalと同じURL、既存`public/ogp.png`の絶対URL・1200×630・代替説明。
- X/Twitter：summary_large_image、タイトル・説明文、同じ画像URLと代替説明。
- サイトマップへのlink要素を追加。
- h1には正式店名を含む読み上げ用テキストを補い、短いヒーローコピーの見た目は維持。
- メタキーワードの羅列、見える本文への検索語の追加は行っていない。

## 構造化データ

同一のJSON-LDグラフ内でWebSite・WebPage・LocalBusiness・OG画像と公式ロゴのImageObjectをIDで関連付け。

- 店名、国際形式の電話番号、住所とビル・階、公開URL、地図、Instagram、LINEを設定。
- 本文と構造化データの住所は`src/data/silkroad.ts`の共通データから生成。
- 店舗写真には提供された店内・入口の実写を指定。生成ヒーローを実店舗の写真として登録していない。
- 営業時間と定休日の例外は店舗のdescriptionにも明記。三連休に伴う変則営業の確定日付は未提供のため、日付別の営業時間データは追加していない。
- 評価、口コミ件数、緯度経度、創業年、価格帯、予約確定のアクションなど、確認できない情報は追加していない。

## クローラー向けファイル

- `src/pages/robots.txt.ts`：静的に`/robots.txt`を出力する設定。クロールを許可し、`https://club-silk-road.pages.dev/sitemap.xml`を案内。
- `src/pages/sitemap.xml.ts`：静的に`/sitemap.xml`を出力する設定。正規トップページ1件のみを登録。
- ページ内の`#lounge`等のアンカー、SNS、画像拡大、原本画像、robots自体は独立したページとしてサイトマップに登録しない。
- 未確認の更新日をlastmodに設定していない。

## 実装と公開状態の区別

- 公開ページを変更前にWeb取得で参照しようとしたが、この取得ツールではアクセスできなかった。サイトの停止を示すものとは断定しない。
- 利用者の「実装後の確認は自分で行うので不要」という指定を引き継ぎ、変更後のビルド・型チェック・静的検査・ブラウザ確認・構造化データ検証・公開URLの再取得は実施していない。
- Cloudflare Pagesへのデプロイ、Search Console登録、サイトマップ送信、インデックス登録リクエストは未実施。
- ソースへの設定完了を、公開ページへの反映や検索順位の改善・検索登録完了として扱わない。

## 公開反映後の作業メモ

利用者が公開反映と確認を行う際は、トップページのcanonical・OGP・構造化データ、`/robots.txt`と`/sitemap.xml`の出力、OGP画像の取得を確認。Search Consoleでこの公開URLの所有権を確認し、`sitemap.xml`を送信する。これらは本作業では実行していない。

## 参照した公式資料

- https://docs.astro.build/en/guides/routing/
- https://docs.astro.build/en/guides/endpoints/
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
