// ===== 電影資料庫 =====
const moviesData = [
    {
        id: 1,
        title: "科學怪人",
        genre: "科幻、恐怖",
        rating: 7.7,
        year: 2025,
        description: "故事圍繞在才華橫溢但自負的科學家維克多透過一場可怕的實驗創造一個生物，最終導致創造者和他悲劇的造物都走向毀滅。",
        image: "https://s.yimg.com/ny/api/res/1.2/5UX6QpABPhLMlA7.4kARoA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTEyMDA7Y2Y9d2VicA--/https://media.zenfs.com/en/creative_bloq_161/c370e669987274950db68ae2f09d288c"
    },
    {
        id: 2,
        title: "炸藥屋",
        genre: "驚悚、劇情",
        rating: 6.4,
        year: 2025,
        description: "故事設定在美國遭遇一枚來源不明的核飛彈攻擊之際，飛彈目標直指芝加哥，整個國家從偵測到危機發生僅有十九分鐘時間可以應對。",
        image: "https://houseofgeekery.com/wp-content/uploads/2025/11/houseposter.jpg"
    },
    {
        id: 3,
        title: "28年毀滅倒數",
        genre: "恐怖",
        rating: 6.6,
        year: 2025,
        description: "病毒肆虐倫敦將近 30 年後，一個男孩與父親離開安全的偏遠島嶼，展開危險的狩獵任務。",
        image: "https://bleedingcool.com/wp-content/uploads/2025/05/twenty_eight_years_later_ver5_xlg-1-1200x900.jpg"
    },
    {
        id: 4,
        title: "喵的奇幻漂流",
        genre: "劇情、冒險、動畫",
        rating: 8.3,
        year: 2024,
        description: "洪災過後，勇敢的貓咪登上一艘小船，和船上各種動物一起漂流，探索被水淹沒的神祕荒野世界。",
        image: "https://auraprods.com/wp-content/uploads/2025/03/flow-blender.webp"
    },
    {
        id: 5,
        title: "婚姻故事",
        genre: "愛情、喜劇、劇情",
        rating: 7.9,
        year: 2019,
        description: "本片由曾入圍奧斯卡金像獎的電影人諾亞·包姆巴赫執導，以深刻卻體恤人心的目光，檢視一段婚姻如何走向破裂，家庭在這過程中又是如何分而不散、團結凝聚。",
        image: "https://miro.medium.com/v2/resize:fit:1400/0*ltEFMs1OtpHBAm4s.jpg"
    },
    {
        id: 6,
        title: "隨身危機",
        genre: "動作、驚悚",
        rating: 6.5,
        year: 2024,
        description: "在神秘旅客的勒索之下，年輕的運輸安全管理局員工讓一個危險的包裹登上了平安夜的航班，他必須與這個神秘人鬥智斗勇。",
        image: "https://lh4.googleusercontent.com/proxy/8lS6bAd9ITGBfD4O_xCLcXVAEBhBcGA72l9B6KXXEVAmgUH3HtOHv5RhDCl3d7kC8qc62LtbNEZFAFKgDX8OnOTR-Vc"
    },
    {
        id: 7,
        title: "獵魔士：狼之惡夢",
        genre: "奇幻、動作",
        rating: 7.4,
        year: 2021,
        description: "年輕的維瑟米爾為了擺脫貧困，自願成為獵魔人並前往凱爾·莫罕受訓。他從一個被詛咒的怪物身上，開始質疑獵魔人的道德觀，並捲入了貴族與女術士的陰謀。",
        image: "https://m.media-amazon.com/images/M/MV5BODQzNDE4N2ItZDAwMC00YzA3LTkwMTEtZDgyMjE3M2ZiY2NiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
        id: 8,
        title: "紫羅蘭永恆花園劇場版",
        genre: "愛情、動畫",
        rating: 8.3,
        year: 2021,
        description: "在戰爭結束的數年後，薇爾莉特在郵政公司倉庫發現一封退回的信件，這封信的出現促使她踏上了一段尋找基爾伯特少校的旅程。與此同時，她也接到了一位重病少年尤里斯的委託，為其代筆寫下想對家人和朋友說的話。",
        image: "https://i.ebayimg.com/images/g/IMoAAOSwRTJlJDuc/s-l1200.jpg"
    },
    {
        id: 9,
        title: "科洛弗悖論",
        genre: "科幻、懸疑",
        rating: 5.6,
        year: 2018,
        description: "一群科學家正繞行地球測試一項裝置，試圖解救因能源危機瀕臨戰爭的地球。但結果卻面臨另一個充滿黑暗的平行時空。",
        image: "https://m.media-amazon.com/images/M/MV5BNGU2YjdiNTctYTQxNy00MDExLWE0ZTktYWNhOWI1NTNlNGUxXkEyXkFqcGc@._V1_.jpg"
    }
];

// ===== 全域變數 =====
let selectedGenres = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderMovieCards();
    renderFavorites();
    setupEventListeners();
    applyDarkMode();
    setupFormValidation();
}

// ===== 渲染電影卡片 =====
function renderMovieCards() {
    const container = document.getElementById('movieCards');
    container.innerHTML = '';

    moviesData.forEach(movie => {
        const isFavorite = favorites.some(fav => fav.id === movie.id);
        const card = createMovieCard(movie, isFavorite);
        container.appendChild(card);
    });
}

function createMovieCard(movie, isFavorite = false) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';

    col.innerHTML = `
        <div class="card movie-card">
            <div class="position-relative">
                <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${movie.id})">
                    <i class="fas fa-heart"></i>
                </button>
                <span class="movie-rating">
                    <i class="fas fa-star"></i> ${movie.rating}
                </span>
            </div>
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="text-muted mb-2">
                    <i class="fas fa-tag me-1"></i>${movie.genre} | ${movie.year}
                </p>
                <p class="card-text">${movie.description}</p>
                <button class="btn btn-primary btn-sm" onclick="showMovieDetails(${movie.id})">
                    查看詳情
                </button>
            </div>
        </div>
    `;

    return col;
}

// ===== 收藏功能 =====
function toggleFavorite(movieId) {
    const movie = moviesData.find(m => m.id === movieId);
    const existingIndex = favorites.findIndex(fav => fav.id === movieId);

    if (existingIndex > -1) {
        favorites.splice(existingIndex, 1);
        showNotification('已從收藏中移除', 'info');
    } else {
        favorites.push(movie);
        showNotification('已加入收藏', 'success');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderMovieCards();
    renderFavorites();
}

function renderFavorites() {
    const container = document.getElementById('favoritesContainer');
    
    if (favorites.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center text-muted">
                <i class="fas fa-heart fa-3x mb-3"></i>
                <p>尚無收藏電影，點擊愛心圖示將喜歡的電影加入收藏</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    favorites.forEach(movie => {
        const card = createMovieCard(movie, true);
        container.appendChild(card);
    });
}

function clearAllFavorites() {
    if (confirm('確定要清空所有收藏嗎？')) {
        favorites = [];
        localStorage.removeItem('favorites');
        renderMovieCards();
        renderFavorites();
        showNotification('已清空所有收藏', 'info');
    }
}

// ===== 表單驗證 =====
function setupFormValidation() {
    const form = document.getElementById('recommendForm');
    const genreButtons = document.querySelectorAll('.genre-btn');
    const messageField = document.getElementById('userMessage');
    const charCount = document.getElementById('charCount');

    // 類型選擇
    genreButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const genre = this.dataset.genre;
            
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                selectedGenres = selectedGenres.filter(g => g !== genre);
            } else {
                this.classList.add('active');
                selectedGenres.push(genre);
            }

            validateGenres();
        });
    });

    // 字元計數
    messageField.addEventListener('input', function() {
        const remaining = 200 - this.value.length;
        charCount.textContent = remaining;
    });

    // 表單提交
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitRecommendation();
        }
    });

    // 即時驗證
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
}

function validateForm() {
    const form = document.getElementById('recommendForm');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    if (!validateGenres()) {
        isValid = false;
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // 基本必填檢查
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = '此欄位為必填';
    }

    // 姓名驗證
    if (field.id === 'userName' && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = '姓名至少需要2個字元';
        }
    }

    // Email 驗證
    if (field.id === 'userEmail' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = '請輸入有效的電子郵件地址';
        }
    }

    // 年齡驗證
    if (field.id === 'userAge' && value) {
        const age = parseInt(value);
        if (age < 13 || age > 100) {
            isValid = false;
            errorMessage = '年齡必須在13-100之間';
        }
    }

    // Checkbox 驗證
    if (field.type === 'checkbox' && field.hasAttribute('required')) {
        if (!field.checked) {
            isValid = false;
            errorMessage = '請同意服務條款';
        }
    }

    // 更新 UI
    if (isValid) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        const feedback = field.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = errorMessage;
        }
    }

    return isValid;
}

function validateGenres() {
    const genreError = document.getElementById('genreError');
    
    if (selectedGenres.length === 0) {
        genreError.textContent = '請至少選擇一個偏好類型';
        genreError.style.display = 'block';
        return false;
    } else {
        genreError.textContent = '';
        genreError.style.display = 'none';
        return true;
    }
}

// ===== 提交推薦 =====
function submitRecommendation() {
    const userName = document.getElementById('userName').value;
    const form = document.getElementById('recommendForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // 顯示載入狀態
    submitBtn.innerHTML = '<span class="loading"></span> 處理中...';
    submitBtn.disabled = true;

    // 模擬 API 請求
    setTimeout(() => {
        // 根據選擇的類型推薦電影
        const recommended = moviesData.filter(movie => 
            selectedGenres.includes(movie.genre)
        ).slice(0, 3);

        displayRecommendations(userName, recommended);

        // 儲存到 localStorage
        const userData = {
            name: userName,
            genres: selectedGenres,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('lastRecommendation', JSON.stringify(userData));

        // 恢復按鈕
        submitBtn.innerHTML = '<i class="fas fa-search me-2"></i>取得推薦';
        submitBtn.disabled = false;

        // 滾動到結果
        setTimeout(() => {
            document.getElementById('recommendResult').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }, 300);
    }, 1500);
}

function displayRecommendations(userName, movies) {
    const resultDiv = document.getElementById('recommendResult');
    const moviesContainer = document.getElementById('recommendedMovies');

    moviesContainer.innerHTML = '';

    if (movies.length === 0) {
        moviesContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning">
                    很抱歉，目前沒有符合您偏好的電影推薦
                </div>
            </div>
        `;
    } else {
        movies.forEach(movie => {
            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="card">
                    <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                        <h6 class="card-title">${movie.title}</h6>
                        <p class="card-text text-muted small">${movie.description}</p>
                        <span class="badge bg-primary">${movie.genre}</span>
                        <span class="badge bg-warning text-dark">
                            <i class="fas fa-star"></i> ${movie.rating}
                        </span>
                    </div>
                </div>
            `;
            moviesContainer.appendChild(col);
        });
    }

    resultDiv.style.display = 'block';
    resultDiv.classList.add('fade-in');
}

// ===== 深色模式 =====
function applyDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    applyDarkMode();
}

// ===== 事件監聽器 =====
function setupEventListeners() {
    // 深色模式切換
    document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);

    // 清空收藏
    document.getElementById('clearFavorites').addEventListener('click', clearAllFavorites);

    // 回到頂部
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 平滑滾動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== 輔助函數 =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function showMovieDetails(movieId) {
    const movie = moviesData.find(m => m.id === movieId);
    alert(`電影：${movie.title}\n類型：${movie.genre}\n評分：${movie.rating}\n年份：${movie.year}\n\n${movie.description}`);
}

function showNotification(message, type = 'success') {
    // 創建通知元素
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3`;
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>${message}
    `;

    document.body.appendChild(notification);

    // 3秒後移除
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
