(function () {
  var PLACEHOLDER = "images/placeholder.svg";
  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function nl2br(str) {
    return escapeHtml(str).replace(/\n/g, "<br>");
  }
  function imgTag(src, alt, className) {
    var safeAlt = escapeHtml(alt || "");
    var cls = className ? ' class="' + className + '"' : "";
    return (
      '<img src="' +
      escapeHtml(src) +
      '" alt="' +
      safeAlt +
      '"' +
      cls +
      ' loading="lazy" onerror="this.onerror=null;this.src=\'' +
      PLACEHOLDER +
      "';\">"
    );
  }
  function categoryLabel(cat) {
    var map = window.SANJU_CATEGORIES || {};
    return map[cat] ? map[cat].label : cat;
  }
  function productHref(id) {
    return "product.html?id=" + encodeURIComponent(id);
  }
  function headerHTML() {
    var c = window.SANJU;
    var logoInner;
    if (c.logoImage) {
      logoInner =
        '<img src="' +
        escapeHtml(c.logoImage) +
        '" alt="' +
        escapeHtml(c.brand.name) +
        '" class="logo-image" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'inline-flex\';">' +
        '<span class="logo-type" style="display:none">' +
        escapeHtml(c.brand.name) +
        "</span>";
    } else {
      logoInner = '<span class="logo-type">' + escapeHtml(c.brand.name) + "</span>";
    }
    var instagram = c.sns && c.sns.instagram;
    return (
      '<div class="header-inner">' +
      '<a class="logo" href="index.html">' +
      '<span class="logo-mark" aria-hidden="true"><span></span><span></span><span></span></span>' +
      logoInner +
      "</a>" +
      '<nav class="nav" data-nav>' +
      '<a href="index.html">HOME</a>' +
      '<a href="about.html">ABOUT</a>' +
      '<a href="shop.html">SHOP</a>' +
      '<a href="soap.html">SOAP</a>' +
      '<a href="tea.html">TEA</a>' +
      '<a href="art.html">ART</a>' +
      '<a href="contact.html">CONTACT</a>' +
      (instagram
        ? '<a href="' + escapeHtml(instagram) + '" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>'
        : "") +
      "</nav>" +
      '<div class="header-tools">' +
      '<button type="button" class="icon-btn" data-open-search aria-label="検索">' +
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="6.5"/><path d="M16.5 16.5L21 21"/></svg>' +
      "</button>" +
      '<a class="icon-btn cart-link" href="cart.html" aria-label="カート">' +
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 8h12l-1 11H7L6 8z"/><path d="M9 8V7a3 3 0 016 0v1"/></svg>' +
      '<span class="cart-badge" data-cart-count hidden>0</span>' +
      "</a>" +
      '<button type="button" class="icon-btn hamburger" data-toggle-nav aria-label="メニュー" aria-expanded="false">' +
      '<span></span><span></span><span></span>' +
      "</button>" +
      "</div></div>"
    );
  }
  function footerHTML() {
    var b = window.SANJU.brand;
    var sns = window.SANJU.sns || {};
    var snsLinks = "";
    if (sns.instagram) {
      snsLinks +=
        '<a href="' +
        escapeHtml(sns.instagram) +
        '" target="_blank" rel="noopener noreferrer">Instagram</a>';
    }
    return (
      '<div class="footer-inner">' +
      '<p class="footer-brand">' +
      escapeHtml(b.name) +
      "</p>" +
      "<p>" +
      escapeHtml(b.atelier) +
      "<br>" +
      escapeHtml(b.address) +
      "<br>" +
      '<a href="' +
      b.telHref +
      '">' +
      escapeHtml(b.tel) +
      "</a><br>" +
      '<a href="mailto:' +
      escapeHtml(b.email) +
      '">' +
      escapeHtml(b.email) +
      "</a></p>" +
      (snsLinks ? '<p class="footer-sns">' + snsLinks + "</p>" : "") +
      '<nav class="footer-nav">' +
      '<a href="shop.html">SHOP</a>' +
      '<a href="about.html">ABOUT</a>' +
      '<a href="access.html">ACCESS</a>' +
      '<a href="contact.html">CONTACT</a>' +
      '<a href="legal.html">特定商取引法に基づく表記</a>' +
      '<a href="privacy.html">プライバシーポリシー</a>' +
      '<a href="terms.html">利用規約</a>' +
      "</nav></div>"
    );
  }
  function productCard(product) {
    var sold = product.stock === 0;
    var price = window.SanjuStore.formatPrice(product.price);
    var buyDisabled = !window.SanjuStore.canPurchase(product);
    return (
      '<article class="product-card reveal">' +
      '<a class="product-card-image" href="' +
      productHref(product.id) +
      '">' +
      imgTag(product.images && product.images[0], product.name) +
      (sold ? '<span class="sold-badge">SOLD OUT</span>' : "") +
      "</a>" +
      '<p class="eyebrow">' +
      escapeHtml(categoryLabel(product.category)) +
      "</p>" +
      "<h3>" +
      escapeHtml(product.name) +
      "</h3>" +
      '<p class="muted">' +
      escapeHtml(product.shortDescription || "") +
      "</p>" +
      '<p class="price">' +
      escapeHtml(price) +
      "</p>" +
      '<div class="card-actions">' +
      '<a class="btn btn-ghost" href="' +
      productHref(product.id) +
      '">詳細を見る</a>' +
      '<button type="button" class="btn" data-add-cart="' +
      escapeHtml(product.id) +
      '"' +
      (buyDisabled ? " disabled" : "") +
      ">" +
      (buyDisabled ? "準備中" : "カートに入れる") +
      "</button>" +
      "</div></article>"
    );
