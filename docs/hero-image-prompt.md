# ヒーロー生成画像の記録

- 生成日：2026年10月28日
- 方法：imagegenスキル／組み込みimage_genツール
- 使用目的：Club シルクロード LPの全面ヒーロー背景
- 保存先：`src/assets/generated/hero-silk-amber.png`
- 出力寸法：1672×941px。プロンプト上の希望寸法2560×1440pxとは区別する。
- 元出力：`C:\Users\callt\.codex\generated_images\01a18098-dc30-7651-8143-e8e9010471eb\exec-f80654e0-c071-4f33-be75-31ba4c98657d.png`
- 入力画像：なし。提供写真を目視し、内装の黒・赤茶・暖色照明を生成ブリーフに反映。
- 実店舗の再現写真ではなく、シルクと乾杯をモチーフにしたイメージビジュアル。
- 人物、文字、ブランドロゴを含まない。公式ロゴはHTMLで重ねる。
- 生成結果は目視確認済み。ワインレッドの布、琥珀色の飲み物、暖色の反射を確認。
- 採用画像は既存素材を上書きせず、プロジェクト内へコピーして保存。
- SHA-256：`4CB19C989140554157F015DA2339590993A8A8318BE9F098EF1A9C2C201F9F24`

## 最終プロンプト

```text
Use case: ads-marketing
Asset type: full-bleed website hero background for a real Japanese neighborhood nightlife lounge called Club シルクロード, landscape 2560x1440.
Primary request: Create a sophisticated, inviting cinematic still-life photograph conveying a warm night, silk, and the anticipation of a toast. This is a conceptual mood photograph, NOT a depiction of the actual venue.
Scene/backdrop: deep charcoal-black and dark wine-red silk fabric draped in generous natural folds, with amber tungsten light gently tracing the fabric. Dark polished reddish brown tabletop across the bottom. One elegant slender clear stemmed glass with a small amount of golden sparkling drink, placed below the center around 55 percent width and 73 percent height. A few distant, very soft out-of-focus warm lights.
Style/medium: realistic editorial still-life photography, authentic fabric weave and glass reflections, restrained film grain, subtle and tactile, intimate neighborhood lounge warmth rather than luxury hotel advertising.
Composition/framing: edge-to-edge photographic composition with flowing fabric across the ENTIRE width. Middle-upper central region must be calm and dark enough to overlay a compact existing logo and one short Japanese line in HTML later. Keep the glass within the central 35 percent of the frame so a narrow portrait crop remains usable. Silk folds create quiet diagonal movement and depth. No left/right split, no collage, no graphic panels, no UI or webpage mockup.
Lighting/mood: beautiful warm amber edge light and soft deep shadows, dark but not crushed, burgundy silk remains readable, natural gentle highlights on glass.
Color palette: charcoal #171416, dark burgundy #552B32, amber #B78B55, subtle warm ivory reflections.
Text: NONE. Do not render any text, letters, logos, or watermark.
Constraints: no people or faces, no invented interior, no chandeliers, no palace or desert or camel, no bottles or brand labels, no neon, no gold particles, no flashy lens flare, no excessive ornament, no stock-photo arrangement of many glasses.
```

## 実装時の扱い

- 画像の中央やや右にグラスがある。PCでは全面表示、スマートフォンではobject-positionを右寄り（初期候補64% 50%）に調整して縦に切り出す。
- ロゴと短いコピーは上側の暗い余白に配置。人物や実際の店内を描いた写真として説明しない。
- 固定連絡バーとグラスの台座が重ならないか、端末ごとに確認する。
- 縦画面でガラスの縁やロゴが重なる場合は、専用の縦画像を追加生成する。
- 元PNGを保持し、実装時にAstroの画像処理でWebP等の配信用画像を作る。
- 本工程ではLP本体への組み込み、実ブラウザのトリミング確認は未実施。

