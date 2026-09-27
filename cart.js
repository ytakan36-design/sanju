(function (window) {
  var STORAGE_KEY = "sanju-cart-v1";
  function publishedProducts() {
    return (window.SANJU_PRODUCTS || []).filter(function (p) {
      return p.published !== false;
    });
  }
  function getProduct(id) {
    return publishedProducts().filter(function (p) {
      return p.id === id;
    })[0];
  }
  function formatPrice(price) {
    if (price === null || price === undefined || price === "") {
      return "要入力";
    }
    return "¥" + Number(price).toLocaleString("ja-JP");
  }
  function canPurchase(product) {
    return (
      product &&
      product.price !== null &&
      product.price !== undefined &&
      product.price !== "" &&
      product.stock !== 0
    );
  }
  function loadCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
  function saveCart(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateCartBadge();
  }
  function cartCount() {
    return loadCart().reduce(function (sum, item) {
      return sum + Number(item.qty || 0);
    }, 0);
  }
  function updateCartBadge() {
    var nodes = document.querySelectorAll("[data-cart-count]");
    var n = cartCount();
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = String(n);
      nodes[i].hidden = n === 0;
    }
  }
  function addToCart(productId, qty) {
    var product = getProduct(productId);
    if (!product) return { ok: false, message: "商品が見つかりません。" };
    if (product.stock === 0) return { ok: false, message: "SOLD OUT です。" };
    if (!canPurchase(product)) {
      return {
        ok: false,
        message: "価格または在庫が「要入力」のため、まだ購入できません。products.js を更新してください。",
      };
    }
    qty = Math.max(1, parseInt(qty, 10) || 1);
    var items = loadCart();
    var found = false;
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === productId) {
        items[i].qty += qty;
        found = true;
      }
    }
    if (!found) items.push({ id: productId, qty: qty });
    saveCart(items);
    return { ok: true };
  }
  function setQty(productId, qty) {
    qty = parseInt(qty, 10);
    var items = loadCart();
    if (!qty || qty < 1) {
      items = items.filter(function (item) {
        return item.id !== productId;
      });
    } else {
      items.forEach(function (item) {
        if (item.id === productId) item.qty = qty;
      });
    }
    saveCart(items);
  }
  function removeItem(productId) {
    saveCart(
      loadCart().filter(function (item) {
        return item.id !== productId;
      })
    );
  }
  function detailedCart() {
    return loadCart()
      .map(function (item) {
        var product = getProduct(item.id);
        if (!product) return null;
        var line = Number(product.price) * Number(item.qty);
        return { product: product, qty: item.qty, lineTotal: line };
      })
      .filter(Boolean);
  }
  function cartTotal() {
    return detailedCart().reduce(function (sum, row) {
      return sum + row.lineTotal;
    }, 0);
  }
  function checkoutToShopify() {
    var cfg = (window.SANJU && window.SANJU.shopify) || {};
    var rows = detailedCart();
    if (!rows.length) return { ok: false, message: "カートが空です。" };
    var missingPrice = rows.some(function (row) {
      return !canPurchase(row.product);
    });
    if (missingPrice) {
      return { ok: false, message: "価格未設定の商品が含まれています。" };
    }
    if (!cfg.enabled || !cfg.storeUrl) {
      return {
        ok: false,
        message:
          "まだShopify決済が有効ではありません。READMEの「STEP 6」を完了し、js/config.js の shopify.enabled を true、storeUrl を入力してください。",
      };
    }
    var missingVariant = rows.filter(function (row) {
      return !row.product.shopifyVariantId;
    });
    if (missingVariant.length) {
      return {
        ok: false,
        message:
          "Shopifyの商品ID（shopifyVariantId）が未入力です。商品をShopifyに登録したあと products.js にIDを入れてください。",
      };
    }
    var path = rows
      .map(function (row) {
        return row.product.shopifyVariantId + ":" + row.qty;
      })
      .join(",");
    var url = String(cfg.storeUrl).replace(/\/$/, "") + "/cart/" + path;
    window.location.href = url;
    return { ok: true };
  }
  window.SanjuStore = {
    publishedProducts: publishedProducts,
    getProduct: getProduct,
    formatPrice: formatPrice,
    canPurchase: canPurchase,
    loadCart: loadCart,
    addToCart: addToCart,
    setQty: setQty,
    removeItem: removeItem,
    detailedCart: detailedCart,
