// ====== 基本資料（本地靜態，便於 GitHub Pages）======
const MOVIES = [
  { id:"tt0111161", title:"刺激1995", year:1994, rating:9.3, runtime:142, genres:["劇情","犯罪"],
    poster:"https://picsum.photos/seed/tt0111161/400/600",
    plot:"監獄中的希望與自由寓言，描述安迪在嚴苛體制中尋找救贖。"},
  { id:"tt0068646", title:"教父", year:1972, rating:9.2, runtime:175, genres:["劇情","犯罪"],
    poster:"https://picsum.photos/seed/tt0068646/400/600",
    plot:"柯里昂家族的權力與親情，黑幫史詩的經典之作。"},
  { id:"tt1375666", title:"全面啟動", year:2010, rating:8.8, runtime:148, genres:["科幻","動作","驚悚"],
    poster:"https://picsum.photos/seed/tt1375666/400/600",
    plot:"潛入夢境深處竊取機密，層層現實之間的對決。"},
  { id:"tt4154796", title:"復仇者聯盟：終局之戰", year:2019, rating:8.4, runtime:181, genres:["動作","科幻"],
    poster:"https://picsum.photos/seed/tt4154796/400/600",
    plot:"眾英雄集結最後一戰，逆轉無限手套造成的毀滅。"},
  { id:"tt7286456", title:"小丑", year:2019, rating:8.4, runtime:122, genres:["劇情","犯罪","驚悚"],
    poster:"https://picsum.photos/seed/tt7286456/400/600",
    plot:"在社會邊緣掙扎的小丑，逐步墜入黑暗的成因。"},
  { id:"tt4154756", title:"復仇者聯盟：無限之戰", year:2018, rating:8.4, runtime:149, genres:["動作","科幻"],
    poster:"https://picsum.photos/seed/tt4154756/400/600",
    plot:"薩諾斯收集無限寶石，群英試圖阻止宇宙浩劫。"},
  { id:"tt4633694", title:"你的名字", year:2016, rating:8.4, runtime:106, genres:["動畫","愛情","劇情"],
    poster:"https://picsum.photos/seed/tt4633694/400/600",
    plot:"在夢中交換身體的少男少女，尋找命運的連結。"},
  { id:"tt6751668", title:"寄生上流", year:2019, rating:8.6, runtime:132, genres:["劇情","驚悚"],
    poster:"https://picsum.photos/seed/tt6751668/400/600",
    plot:"兩個階層的家庭交織，黑色幽默下的階級寓言。"},
  { id:"tt4158110", title:"驚奇隊長", year:2019, rating:6.8, runtime:123, genres:["動作","科幻"],
    poster:"https://picsum.photos/seed/tt4158110/400/600",
    plot:"飛行員卡蘿成為宇宙最強英雄之一的起源故事。"},
  { id:"tt2109248", title:"玩命關頭 7", year:2015, rating:7.1, runtime:137, genres:["動作","驚悚"],
    poster:"https://picsum.photos/seed/tt2109248/400/600",
    plot:"家人與速度的選擇，告別保羅沃克的情感之作。"},
  { id:"tt6723592", title:"天能", year:2020, rating:7.3, runtime:150, genres:["科幻","動作","驚悚"],
    poster:"https://picsum.photos/seed/tt6723592/400/600",
    plot:"時間逆轉的諜報行動，理解 = 生存。"},
  { id:"tt0892769", title:"玩具總動員 3", year:2010, rating:8.3, runtime:103, genres:["動畫","喜劇","劇情"],
    poster:"https://picsum.photos/seed/tt0892769/400/600",
    plot:"成長與告別，玩具們面對主人上大學的關卡。"},
];

// ====== 狀態 & 工具 ======
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

const state = {
  query: "",
  minRating: 0,
  genres: new Set(),
  sort: "rating-desc",
  favOnly: false,
  favorites: loadJSON("favorites", {}),
  suggestions: loadJSON("suggestions", []),
  theme: loadJSON("theme", "light")
};

function loadJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch (_) { return fallback; }
}
function saveJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

function toast(msg) {
  const box = $("#toast");
  box.innerHTML = `
    <div class="toast align-items-center show text-bg-dark border-0" role="status" aria-live="polite">
      <div class="d-flex">
        <div class="toast-body">${msg}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>`;
  setTimeout(()=> box.innerHTML="", 2000);
}

// ====== 篩選 / 排序 ======
function getFilteredMovies() {
  let list = MOVIES.filter(m => {
    const text = (m.title + " " + m.plot).toLowerCase();
    const hitText = text.includes(state.query.toLowerCase());
    const hitRating = Number(m.rating) >= state.minRating;
    const hitGenres = state.genres.size
      ? m.genres.some(g => state.genres.has(g))
      : true;
    const hitFav = state.favOnly ? Boolean(state.favorites[m.id]) : true;
    return hitText && hitRating && hitGenres && hitFav;
  });

  switch (state.sort) {
    case "year-desc":   list.sort((a,b)=> b.year - a.year); break;
    case "title-asc":   list.sort((a,b)=> a.title.localeCompare(b.title, 'zh-Hant')); break;
    default:            list.sort((a,b)=> b.rating - a.rating); // rating-desc
  }
  return list;
}

// ====== UI 渲染 ======
const cards = $("#cards");

function render() {
  cards.innerHTML = "";
  const list = getFilteredMovies();
  if (!list.length) {
    cards.innerHTML = `<div class="col"><div class="alert alert-warning">找不到符合條件的電影。</div></div>`;
    return;
  }
  const frag = document.createDocumentFragment();
  list.forEach(m => frag.appendChild(makeCard(m)));
  cards.appendChild(frag);
}

function makeCard(m) {
  // createElement + DOM 組裝
  const col = document.createElement("div");
  col.className = "col";
  col.innerHTML = `
    <div class="card movie-card h-100" data-id="${m.id}">
      <img class="movie-poster" src="${m.poster}" alt="${m.title}">
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h3 class="h6 card-title mb-0">${m.title}</h3>
          <span class="badge text-bg-primary">★ ${m.rating}</span>
        </div>
        <p class="card-text small text-body-secondary mb-2">${m.year} · ${m.runtime} 分鐘</p>
        <p class="card-text flex-grow-1">${m.plot}</p>
        <div class="mt-2 d-flex flex-wrap gap-1">
          ${m.genres.map(g=>`<span class="badge text-bg-secondary">${g}</span>`).join("")}
        </div>
      </div>
      <div class="card-footer d-flex gap-2">
        <button class="btn btn-sm btn-outline-warning fav-btn ${state.favorites[m.id]?'active':''}">收藏</button>
        <button class="btn btn-sm btn-outline-primary detail-btn" data-bs-toggle="modal" data-bs-target="#detailModal">詳情</button>
      </div>
    </div>`;
  return col;
}

// ====== 事件綁定（事件委派）======
cards.addEventListener("click", (e) => {
  const card = e.target.closest(".movie-card");
  if (!card) return;
  const id = card.dataset.id;
  if (e.target.classList.contains("fav-btn")) {
    state.favorites[id] = state.favorites[id] ? 0 : 1;
    saveJSON("favorites", state.favorites);
    e.target.classList.toggle("active");
    toast(state.favorites[id] ? "已加入收藏" : "已移除收藏");
  }
  if (e.target.classList.contains("detail-btn")) {
    openDetail(id);
  }
});

// 類型複選（父層委派）
$("#genreFilters").addEventListener("change", (e) => {
  if (e.target.matches("input[type=checkbox]")) {
    if (e.target.checked) state.genres.add(e.target.value);
    else state.genres.delete(e.target.value);
    render();
  }
});

// 搜尋（即時）
$("#searchInput").addEventListener("input", debounce((e)=>{
  state.query = e.target.value.trim();
  render();
}, 200));

// 排序
$("#sortSelect").addEventListener("change", e => {
  state.sort = e.target.value;
  render();
});

// 評分區間
const ratingRange = $("#ratingRange");
const ratingLabel = $("#ratingLabel");
ratingRange.addEventListener("input", e => {
  ratingLabel.textContent = e.target.value;
});
ratingRange.addEventListener("change", e => {
  state.minRating = Number(e.target.value);
  render();
});

// 只看收藏
$("#favOnly").addEventListener("change", e => {
  state.favOnly = e.target.checked;
  render();
});

// 深色模式
const html = document.documentElement;
$("#themeToggle").checked = state.theme === "dark";
applyTheme(state.theme);
$("#themeToggle").addEventListener("change", e=>{
  const t = e.target.checked ? "dark" : "light";
  applyTheme(t);
  saveJSON("theme", t);
});
function applyTheme(t) { html.setAttribute("data-bs-theme", t); }

// ====== 詳情 Modal ======
function openDetail(id) {
  const m = MOVIES.find(x=>x.id===id);
  if (!m) return;
  $("#detailTitle").textContent = `${m.title}（${m.year}）`;
  $("#detailBody").innerHTML = `
    <div class="row g-3">
      <div class="col-md-4">
        <img class="img-fluid rounded" src="${m.poster}" alt="${m.title}">
      </div>
      <div class="col-md-8">
        <p class="mb-1"><strong>評分：</strong>${m.rating} / 10</p>
        <p class="mb-1"><strong>片長：</strong>${m.runtime} 分鐘</p>
        <p class="mb-1"><strong>類型：</strong>${m.genres.join("、")}</p>
        <p class="mt-2">${m.plot}</p>
      </div>
    </div>`;
}

// ====== 投稿表單（Constraint Validation + 攔截）======
const suggestForm = $("#suggestForm");
const suggestList = $("#suggestList");

// 自訂錯誤訊息（示範 setCustomValidity）
$("#sReason").addEventListener("input", (e)=>{
  if (e.target.value.trim().length < 10) {
    e.target.setCustomValidity("推薦理由至少 10 個字喔！");
  } else {
    e.target.setCustomValidity("");
  }
});

suggestForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  e.stopPropagation();

  if (!suggestForm.checkValidity()) {
    suggestForm.classList.add("was-validated");
    toast("請修正表單後再送出");
    return;
  }

  const data = {
    title: $("#sTitle").value.trim(),
    email: $("#sEmail").value.trim(),
    genre: $("#sGenre").value,
    rating: Number($("#sRating").value),
    reason: $("#sReason").value.trim(),
    ts: new Date().toISOString()
  };
  state.suggestions.unshift(data);
  saveJSON("suggestions", state.suggestions);
  addSuggestItem(data, true);

  suggestForm.reset();
  suggestForm.classList.remove("was-validated");
  toast("收到你的推薦，已加入清單！");
  $("#sTitle").focus();
});

function addSuggestItem(item, showListIfHidden=false) {
  if (showListIfHidden) suggestList.classList.remove("d-none");
  const el = document.createElement("a");
  el.href = "#";
  el.className = "list-group-item list-group-item-action suggest-item";
  el.innerHTML = `
    <div class="d-flex w-100 justify-content-between">
      <h6 class="mb-1">《${item.title}》— ${item.genre}（★${item.rating}）</h6>
      <small>${new Date(item.ts).toLocaleString('zh-TW')}</small>
    </div>
    <p class="mb-1">${item.reason}</p>
    <small>不公開的聯絡：${item.email || "（未提供）"}</small>`;
  suggestList.appendChild(el);
}

// 初始化：載入投稿列表
(function init() {
  // 主畫面
  ratingLabel.textContent = ratingRange.value;
  render();

  // 投稿
  if (state.suggestions.length) {
    suggestList.classList.remove("d-none");
    state.suggestions.forEach(s => addSuggestItem(s));
  }
})();

// ====== 小工具：防抖 ======
function debounce(fn, delay=200){
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(()=> fn(...args), delay);
  };
}
