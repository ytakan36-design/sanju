/**
 * 商品マスター（ここだけ編集すれば商品の追加・修正ができます）
 *
 * 価格が未定のときは price: null （画面には「要入力」と出ます。カート決済はできません）
 * Shopify連携後は shopifyVariantId にバリエーションIDを入れてください。
 *
 * 薬機法・食品表示に関わる文面は断定表現を避け、不明な項目は「要入力」「要確認」のまま残してください。
 */
window.SANJU_PRODUCTS = [
  {
    id: "soap-001",
    category: "soap",
    published: true,
    name: "ソンバーユ入り手作り石鹸",
    shortDescription:
      "ソンバーユを配合し、肌にやさしく、うるおいを感じられる手作り石鹸。",
    description:
      "ソンバーユを使用した手作り石鹸。毎日の洗顔や身体の洗浄に使いやすく、しっとりとした使い心地を目指した石鹸です。敏感肌の方にも配慮した、しっとりとした使い心地を大切にしています。\n※実際の商品仕様・成分に合わせて、この文章は後から変更してください。",
    price: null, // 要入力（数字。例: 1800。勝手に金額は入れていません）
    images: ["images/soap-01.jpg", "images/soap-02.jpg"],
    volume: "要入力",
    size: "要入力",
    ingredients: "要入力",
    howToUse: "要入力",
    precautions: "要入力",
    storage: "要入力",
    originNote: "販売者情報・表示内容は要確認",
    stock: null, // 数字を入れると在庫表示。0 で SOLD OUT。未定は null
    shopifyVariantId: "", // ShopifyのバリエーションID（数字）
    seller: "アトリエライブ",
  },
  {
    id: "tea-jin",
    category: "tea",
    published: true,
    name: "腎養生",
    shortDescription: "日々の養生を意識したブレンドティー。毎日のティータイムに。",
    description:
      "漢方の考え方を取り入れたブレンドティー「腎養生」。身体をいたわる時間に、香りと味わいを楽しむためのお茶です。病気の治療や効能を目的としたものではありません。",
    price: null,
    images: ["images/tea-jin.jpg"],
    volume: "要入力",
    size: "要入力",
    ingredients: "要入力",
    howToUse: "要入力（例：人数分の目安、湯温、浸出時間などは商品確定後に記入）",
    precautions: "要入力（アレルギー・妊娠中・持病のある方への案内は要確認）",
    storage: "要入力",
    originNote: "食品表示の記載内容は要確認",
    stock: null,
    shopifyVariantId: "",
    seller: "アトリエライブ",
  },
  {
    id: "tea-kan",
    category: "tea",
    published: true,
    name: "肝養生",
    shortDescription: "日々の養生を意識したブレンドティー。身体をいたわる時間に。",
    description:
      "漢方の考え方を取り入れたブレンドティー「肝養生」。毎日のティータイムに、落ち着いた時間を過ごすためのブレンドです。病気の治療や効能を目的としたものではありません。",
    price: null,
    images: ["images/tea-kan.jpg"],
    volume: "要入力",
    size: "要入力",
    ingredients: "要入力",
    howToUse: "要入力",
    precautions: "要入力",
    storage: "要入力",
    originNote: "食品表示の記載内容は要確認",
    stock: null,
    shopifyVariantId: "",
    seller: "アトリエライブ",
  },
  {
    id: "tea-hi",
    category: "tea",
    published: true,
    name: "脾養生",
    shortDescription: "日々の養生を意識したブレンドティー。毎日のティータイムに。",
    description:
      "漢方の考え方を取り入れたブレンドティー「脾養生」。暮らしのなかで、身体をいたわる時間をつくるためのブレンドです。病気の治療や効能を目的としたものではありません。",
    price: null,
    images: ["images/tea-hi.jpg"],
    volume: "要入力",
    size: "要入力",
    ingredients: "要入力",
    howToUse: "要入力",
    precautions: "要入力",
    storage: "要入力",
    originNote: "食品表示の記載内容は要確認",
    stock: null,
    shopifyVariantId: "",
    seller: "アトリエライブ",
  },
];
/**
 * アート作品の追加例（コピーして published: true にするとギャラリーに出ます）
 *
 * {
 *   id: "art-001",
 *   category: "art",
 *   published: true,
 *   name: "要入力（作品名）",
 *   artist: "要入力（作家名）",
 *   year: "要入力",
 *   size: "要入力",
 *   material: "要入力（素材）",
 *   shortDescription: "要入力",
 *   description: "要入力",
 *   price: null,
 *   images: ["images/art-01.jpg"],
 *   stock: null,
 *   shopifyVariantId: "",
 *   seller: "アトリエライブ",
 * }
 */
window.SANJU_CATEGORIES = {
  soap: { id: "soap", label: "手作り石鹸", nav: "SOAP", shopKey: "SOAP" },
  tea: { id: "tea", label: "漢方ブレンドティー", nav: "TEA", shopKey: "TEA" },
  art: { id: "art", label: "アートワーク", nav: "ART", shopKey: "ART" },
};
