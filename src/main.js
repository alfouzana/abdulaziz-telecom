import "./style.css";

const WHATSAPP = "966535444777";

const CATS = [
  { id: "all", label: "الكل" },
  { id: "apple", label: "آيفون" },
  { id: "samsung", label: "سامسونج" },
  { id: "other", label: "أجهزة أخرى" },
  { id: "acc", label: "إكسسوارات" },
];

// type: phone | buds | charger | case | watch
const PRODUCTS = [
  { id: 1, cat: "apple", name: "iPhone 17 Pro Max", spec: "256GB · برتقالي كوني", price: 5299, color: "#e8794a", type: "phone", tag: "الأكثر طلبًا" },
  { id: 2, cat: "apple", name: "iPhone 17 Pro", spec: "256GB · أزرق داكن", price: 4799, color: "#2f3e5c", type: "phone" },
  { id: 3, cat: "apple", name: "iPhone 17", spec: "128GB · أخضر مريمي", price: 3499, color: "#a8c3b0", type: "phone" },
  { id: 4, cat: "samsung", name: "Galaxy S26 Ultra", spec: "512GB · تيتانيوم أسود", price: 5199, old: 5499, color: "#27272a", type: "phone", tag: "خصم 300" },
  { id: 5, cat: "samsung", name: "Galaxy Z Flip7", spec: "256GB · أزرق", price: 3899, color: "#5b7fc9", type: "phone" },
  { id: 6, cat: "samsung", name: "Galaxy A56", spec: "256GB · رمادي", price: 1499, color: "#9ca3af", type: "phone" },
  { id: 7, cat: "other", name: "Redmi Note 14 Pro", spec: "256GB · أرجواني", price: 1199, color: "#8b6fc9", type: "phone" },
  { id: 8, cat: "other", name: "HONOR 400", spec: "512GB · ذهبي", price: 1799, color: "#c9a96f", type: "phone" },
  { id: 9, cat: "acc", name: "AirPods Pro 3", spec: "إلغاء الضوضاء", price: 999, color: "#f1f5f9", type: "buds" },
  { id: 10, cat: "acc", name: "شاحن سريع 25W", spec: "USB-C أصلي", price: 89, color: "#f8fafc", type: "charger" },
  { id: 11, cat: "acc", name: "كفر MagSafe", spec: "لسلسلة iPhone 17", price: 149, color: "#1e3a8a", type: "case" },
  { id: 12, cat: "acc", name: "Galaxy Watch8", spec: "44mm · فضي", price: 1299, color: "#cbd5e1", type: "watch" },
];

const sar = (n) => `${n.toLocaleString("en-US")} ر.س`;

function art(p, size = "h-40") {
  const c = p.color;
  const svgs = {
    phone: `<svg viewBox="0 0 80 150" class="${size}"><rect x="4" y="2" width="72" height="146" rx="14" fill="${c}"/><rect x="8" y="6" width="64" height="138" rx="11" fill="#0f172a"/><rect x="10" y="8" width="60" height="134" rx="9" fill="url(#g${p.id})"/><rect x="30" y="12" width="20" height="6" rx="3" fill="#0f172a"/><defs><linearGradient id="g${p.id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".9"/><stop offset="1" stop-color="#0f172a"/></linearGradient></defs></svg>`,
    buds: `<svg viewBox="0 0 120 100" class="${size}"><rect x="20" y="30" width="80" height="60" rx="22" fill="#fff" stroke="#e2e8f0" stroke-width="3"/><line x1="22" y1="52" x2="98" y2="52" stroke="#e2e8f0" stroke-width="2"/><circle cx="60" cy="70" r="3" fill="#94a3b8"/></svg>`,
    charger: `<svg viewBox="0 0 100 120" class="${size}"><rect x="38" y="4" width="6" height="20" rx="2" fill="#94a3b8"/><rect x="56" y="4" width="6" height="20" rx="2" fill="#94a3b8"/><rect x="20" y="22" width="60" height="70" rx="12" fill="#fff" stroke="#e2e8f0" stroke-width="3"/><rect x="44" y="72" width="12" height="5" rx="2" fill="#cbd5e1"/></svg>`,
    case: `<svg viewBox="0 0 80 150" class="${size}"><rect x="4" y="2" width="72" height="146" rx="16" fill="${c}"/><rect x="10" y="10" width="28" height="30" rx="8" fill="#0f172a" opacity=".35"/><circle cx="40" cy="85" r="18" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="3"/></svg>`,
    watch: `<svg viewBox="0 0 100 150" class="${size}"><rect x="30" y="0" width="40" height="150" rx="10" fill="#475569"/><circle cx="50" cy="75" r="34" fill="${c}"/><circle cx="50" cy="75" r="28" fill="#0f172a"/><text x="50" y="80" text-anchor="middle" font-size="14" fill="#fff" font-family="sans-serif">10:09</text></svg>`,
  };
  return svgs[p.type];
}

// hero
document.querySelector("[data-hero-phones]").innerHTML = [PRODUCTS[3], PRODUCTS[0], PRODUCTS[4]]
  .map((p, i) => `<div class="${i === 1 ? "-translate-y-6" : ""} drop-shadow-2xl">${art(p, i === 1 ? "h-72 md:h-80" : "h-56 md:h-64")}</div>`)
  .join("");

// filters + grid
let current = "all";
const filtersEl = document.querySelector("[data-filters]");
const gridEl = document.querySelector("[data-products]");

function renderFilters() {
  filtersEl.innerHTML = CATS.map(
    (c) => `<button data-cat="${c.id}" class="rounded-full px-4 py-2 text-sm font-bold ${c.id === current ? "bg-slate-900 text-white" : "bg-slate-100 hover:bg-slate-200"}">${c.label}</button>`
  ).join("");
}

function renderProducts() {
  const list = current === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === current);
  gridEl.innerHTML = list
    .map(
      (p) => `
    <div class="group flex flex-col rounded-2xl border border-slate-100 p-4 transition hover:shadow-lg">
      <div class="relative flex h-44 items-center justify-center rounded-xl bg-slate-50">
        ${p.tag ? `<span class="absolute top-2 right-2 rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold text-white">${p.tag}</span>` : ""}
        ${art(p, "h-36")}
      </div>
      <h3 class="mt-4 font-bold" dir="ltr" style="text-align:right">${p.name}</h3>
      <p class="text-xs text-slate-500">${p.spec}</p>
      <div class="mt-3 mb-4 flex items-baseline gap-2">
        <span class="text-lg font-extrabold">${sar(p.price)}</span>
        ${p.old ? `<span class="text-xs text-slate-400 line-through">${sar(p.old)}</span>` : ""}
      </div>
      <button data-add="${p.id}" class="mt-auto rounded-full bg-brand/10 py-2 text-sm font-bold text-brand hover:bg-brand hover:text-white">أضف للسلة</button>
    </div>`
    )
    .join("");
}

filtersEl.addEventListener("click", (e) => {
  const b = e.target.closest("[data-cat]");
  if (!b) return;
  current = b.dataset.cat;
  renderFilters();
  renderProducts();
});

// cart
let cart = JSON.parse(localStorage.getItem("az-cart") || "{}");
const save = () => localStorage.setItem("az-cart", JSON.stringify(cart));
const drawer = document.querySelector("[data-cart]");
const itemsEl = document.querySelector("[data-cart-items]");
const countEl = document.querySelector("[data-cart-count]");
const totalEl = document.querySelector("[data-cart-total]");
const checkoutBtn = document.querySelector("[data-checkout]");
const toast = document.querySelector("[data-toast]");

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove("opacity-0", "translate-y-4");
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.add("opacity-0", "translate-y-4"), 1800);
}

function renderCart() {
  const entries = Object.entries(cart).filter(([, q]) => q > 0);
  const count = entries.reduce((s, [, q]) => s + q, 0);
  const total = entries.reduce((s, [id, q]) => s + PRODUCTS.find((p) => p.id == id).price * q, 0);
  countEl.textContent = count;
  countEl.classList.toggle("hidden", !count);
  countEl.classList.toggle("flex", !!count);
  totalEl.textContent = sar(total);
  checkoutBtn.disabled = !count;
  itemsEl.innerHTML = count
    ? entries
        .map(([id, q]) => {
          const p = PRODUCTS.find((x) => x.id == id);
          return `<div class="flex items-center gap-3">
            <div class="flex h-16 w-14 items-center justify-center rounded-lg bg-slate-50">${art(p, "h-12")}</div>
            <div class="flex-1"><p class="text-sm font-bold" dir="ltr" style="text-align:right">${p.name}</p><p class="text-xs text-slate-500">${sar(p.price)}</p></div>
            <div class="flex items-center gap-2 rounded-full bg-slate-100 px-2">
              <button data-qty="${id}" data-d="1" class="px-1 font-bold">+</button><span class="text-sm">${q}</span><button data-qty="${id}" data-d="-1" class="px-1 font-bold">−</button>
            </div></div>`;
        })
        .join("")
    : `<p class="pt-10 text-center text-slate-400">السلة فاضية حاليًا</p>`;
}

gridEl.addEventListener("click", (e) => {
  const b = e.target.closest("[data-add]");
  if (!b) return;
  cart[b.dataset.add] = (cart[b.dataset.add] || 0) + 1;
  save();
  renderCart();
  showToast("تمت الإضافة للسلة ✓");
});

itemsEl.addEventListener("click", (e) => {
  const b = e.target.closest("[data-qty]");
  if (!b) return;
  cart[b.dataset.qty] = Math.max(0, (cart[b.dataset.qty] || 0) + Number(b.dataset.d));
  if (!cart[b.dataset.qty]) delete cart[b.dataset.qty];
  save();
  renderCart();
});

document.querySelectorAll("[data-cart-open]").forEach((b) => b.addEventListener("click", () => drawer.classList.remove("hidden")));
document.querySelectorAll("[data-cart-close]").forEach((b) => b.addEventListener("click", () => drawer.classList.add("hidden")));

checkoutBtn.addEventListener("click", () => {
  const lines = Object.entries(cart).map(([id, q]) => {
    const p = PRODUCTS.find((x) => x.id == id);
    return `- ${p.name} (${p.spec}) × ${q} = ${sar(p.price * q)}`;
  });
  const total = Object.entries(cart).reduce((s, [id, q]) => s + PRODUCTS.find((p) => p.id == id).price * q, 0);
  const msg = `السلام عليكم، أبي أطلب من متجر عبد العزيز للاتصالات:\n${lines.join("\n")}\n\nالإجمالي: ${sar(total)}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
});

renderFilters();
renderProducts();
renderCart();
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));
