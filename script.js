/* ========================================
   UAE Taraweeh Directory — Ramadan 1447H
   Mobile-First App Logic
   ======================================== */

// ===== State =====
let imamsData = [];
let discoverQueue = [];     // imams in the swipe queue
let currentCardIndex = 0;
let favorites = JSON.parse(localStorage.getItem('taraweeh_favs') || '[]');
let userLocation = null;
let locationEnabled = false;
let currentAudioImam = null;
let isDragging = false;

// Audio element
const globalAudio = document.getElementById('global-audio');

// ===== Ramadan 2026 (1447H) dates in UAE timezone =====
const RAMADAN_START = new Date('2026-03-01T00:00:00+04:00'); // approximate
const RAMADAN_END   = new Date('2026-03-30T23:59:59+04:00');

// ──────────────────────────────────────
// Initialization
// ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCountdown();
    fetchImamsData();
    initTabs();
    initNavActions();
    initAudioBar();
    handleDeepLink();
});

// ──────────────────────────────────────
// Data Fetching
// ──────────────────────────────────────
function fetchImamsData() {
    fetch('imams_data.json')
        .then(r => r.json())
        .then(data => {
            imamsData = data;
            buildDiscoverQueue();
            renderDiscoverCards();
            renderDirectory();
            renderStats();
            populateFilterOptions();
            setupSearch();
            updateFavCount();
        })
        .catch(err => {
            console.error('Failed to load imam data:', err);
            showToast('Failed to load data');
        });
}

// ──────────────────────────────────────
// Countdown Timer
// ──────────────────────────────────────
function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 60000); // every minute
}

function updateCountdown() {
    const now = new Date();
    const labelEl = document.getElementById('countdown-label');
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');

    if (now >= RAMADAN_START && now <= RAMADAN_END) {
        // During Ramadan — show which day
        const dayNum = Math.ceil((now - RAMADAN_START) / (1000 * 60 * 60 * 24));
        labelEl.textContent = 'Ramadan Mubarak';
        const container = document.getElementById('countdown');
        container.innerHTML = `
            <div class="countdown-label">Ramadan Mubarak</div>
            <div class="ramadan-day-display">Day ${dayNum} of Ramadan</div>
        `;
    } else if (now < RAMADAN_START) {
        // Before Ramadan — countdown
        const diff = RAMADAN_START - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minsEl.textContent = String(mins).padStart(2, '0');
    } else {
        // After Ramadan
        labelEl.textContent = 'Ramadan 1447H has ended';
        document.querySelector('.countdown-timer').style.display = 'none';
    }
}

// ──────────────────────────────────────
// Theme (Dark / Light)
// ──────────────────────────────────────
function initTheme() {
    const saved = localStorage.getItem('taraweeh_theme');
    if (saved === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    document.getElementById('theme-toggle').addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? '' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('taraweeh_theme', next || 'dark');
    });
}

// ──────────────────────────────────────
// Tab Navigation
// ──────────────────────────────────────
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            document.getElementById(`tab-${target}`).classList.add('active');
        });
    });

    // Hero CTA → discover
    document.getElementById('start-discover').addEventListener('click', () => {
        document.querySelector('.tab[data-tab="discover"]').click();
        document.getElementById('tab-bar').scrollIntoView({ behavior: 'smooth' });
    });
}

// ──────────────────────────────────────
// Nav Actions: Favorites & Theme
// ──────────────────────────────────────
function initNavActions() {
    document.getElementById('favorites-toggle').addEventListener('click', openFavorites);
    document.getElementById('close-favorites').addEventListener('click', closeFavorites);
}

function openFavorites() {
    renderFavoritesList();
    document.getElementById('favorites-panel').classList.add('open');
}

function closeFavorites() {
    document.getElementById('favorites-panel').classList.remove('open');
}

// ──────────────────────────────────────
// Discover: Build Queue
// ──────────────────────────────────────
function buildDiscoverQueue(filter = 'all') {
    let pool = [...imamsData];

    // Sort by proximity if location enabled
    if (locationEnabled && userLocation) {
        pool.forEach(imam => {
            imam._distance = haversine(
                userLocation.lat, userLocation.lng,
                imam.coordinates.lat, imam.coordinates.lng
            );
        });
        pool.sort((a, b) => a._distance - b._distance);
    }

    // Filter by city if not 'all'
    if (filter !== 'all') {
        pool = pool.filter(i => i.city === filter);
    }

    discoverQueue = pool;
    currentCardIndex = 0;
}

// ──────────────────────────────────────
// Discover: Render Swipe Cards
// ──────────────────────────────────────
function renderDiscoverCards() {
    const stack = document.getElementById('card-stack');
    const emptyState = document.getElementById('empty-state');
    const actions = document.getElementById('swipe-actions');
    stack.innerHTML = '';

    if (discoverQueue.length === 0) {
        emptyState.style.display = 'block';
        actions.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    actions.style.display = 'flex';

    // Render top 3 cards (stacked)
    const visible = discoverQueue.slice(currentCardIndex, currentCardIndex + 3);
    visible.reverse().forEach((imam, i) => {
        const realIndex = visible.length - 1 - i;
        const card = createSwipeCard(imam, realIndex);
        stack.appendChild(card);
    });

    // Setup swipe on top card
    const topCard = stack.lastElementChild;
    if (topCard) setupSwipeGesture(topCard);

    // Bind action buttons
    bindActionButtons();

    // Show hints briefly
    const hints = document.getElementById('swipe-instructions');
    hints.classList.add('show');
    setTimeout(() => hints.classList.remove('show'), 2500);
}

function createSwipeCard(imam, stackPos) {
    const card = document.createElement('div');
    card.className = 'swipe-card';
    card.dataset.imamId = imam.id;
    card.style.zIndex = 10 - stackPos;

    // Slight stacking offset for depth
    if (stackPos > 0) {
        card.style.transform = `scale(${1 - stackPos * 0.04}) translateY(${stackPos * 8}px)`;
        card.style.opacity = 1 - stackPos * 0.15;
        card.style.pointerEvents = 'none';
    }

    const isFav = favorites.includes(imam.id);
    const distanceHtml = imam._distance
        ? `<span class="distance-text">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
             ${formatDistance(imam._distance)}
           </span>`
        : '';

    card.innerHTML = `
        <div class="swipe-overlay like">SAVED</div>
        <div class="swipe-overlay nope">SKIP</div>
        <div class="card-gold-bar"></div>
        <div class="card-body">
            <div class="card-imam-name">${imam.name}</div>
            <div class="card-mosque-name">${imam.mosque}</div>
            <div class="card-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ${imam.location}
            </div>
            <div class="card-tags">
                ${imam.recitationStyle ? `<span class="card-tag style">${imam.recitationStyle}</span>` : ''}
                ${imam.taraweehType ? `<span class="card-tag type">${imam.taraweehType}</span>` : ''}
                <span class="card-tag days">${formatRecitationDays(imam.recitationStart, imam.recitationEnd)}</span>
            </div>
            ${imam.additionalInfo ? `<div class="card-info">${imam.additionalInfo}</div>` : ''}
            <div class="card-distance">
                ${distanceHtml}
                <a href="https://www.google.com/maps/search/?api=1&query=${imam.coordinates.lat},${imam.coordinates.lng}"
                   target="_blank" rel="noopener" class="card-maps-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Google Maps
                </a>
            </div>
        </div>
    `;

    return card;
}

// ──────────────────────────────────────
// Discover: Swipe Gesture
// ──────────────────────────────────────
function setupSwipeGesture(card) {
    let startX = 0, startY = 0, currentX = 0, moved = false;

    function onStart(e) {
        isDragging = true;
        moved = false;
        const pt = e.touches ? e.touches[0] : e;
        startX = pt.clientX;
        startY = pt.clientY;
        card.style.transition = 'none';
    }

    function onMove(e) {
        if (!isDragging) return;
        const pt = e.touches ? e.touches[0] : e;
        currentX = pt.clientX - startX;
        const rotation = currentX * 0.08;
        card.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
        moved = true;

        // Show overlays
        const likeOverlay = card.querySelector('.swipe-overlay.like');
        const nopeOverlay = card.querySelector('.swipe-overlay.nope');
        const threshold = 60;

        if (currentX > threshold) {
            likeOverlay.style.opacity = Math.min((currentX - threshold) / 80, 1);
            nopeOverlay.style.opacity = 0;
        } else if (currentX < -threshold) {
            nopeOverlay.style.opacity = Math.min((-currentX - threshold) / 80, 1);
            likeOverlay.style.opacity = 0;
        } else {
            likeOverlay.style.opacity = 0;
            nopeOverlay.style.opacity = 0;
        }
    }

    function onEnd() {
        if (!isDragging) return;
        isDragging = false;
        const swipeThreshold = 100;

        card.style.transition = '';
        card.classList.add('animating');

        if (currentX > swipeThreshold) {
            // Swipe right → favorite
            card.style.transform = `translateX(${window.innerWidth}px) rotate(30deg)`;
            card.style.opacity = '0';
            setTimeout(() => handleSwipe('right'), 300);
        } else if (currentX < -swipeThreshold) {
            // Swipe left → skip
            card.style.transform = `translateX(-${window.innerWidth}px) rotate(-30deg)`;
            card.style.opacity = '0';
            setTimeout(() => handleSwipe('left'), 300);
        } else {
            // Return to center
            card.style.transform = '';
            card.querySelector('.swipe-overlay.like').style.opacity = 0;
            card.querySelector('.swipe-overlay.nope').style.opacity = 0;
        }
        currentX = 0;
    }

    card.addEventListener('touchstart', onStart, { passive: true });
    card.addEventListener('touchmove', onMove, { passive: true });
    card.addEventListener('touchend', onEnd);
    card.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
}

function handleSwipe(direction) {
    if (currentCardIndex >= discoverQueue.length) return;

    const imam = discoverQueue[currentCardIndex];
    if (direction === 'right') {
        addFavorite(imam.id);
        showToast(`💛 Saved ${imam.name}`);
    }
    currentCardIndex++;

    if (currentCardIndex >= discoverQueue.length) {
        document.getElementById('card-stack').innerHTML = '';
        document.getElementById('empty-state').style.display = 'block';
        document.getElementById('swipe-actions').style.display = 'none';
    } else {
        renderDiscoverCards();
    }
}

// ──────────────────────────────────────
// Discover: Action Buttons
// ──────────────────────────────────────
function bindActionButtons() {
    document.getElementById('btn-skip').onclick = () => {
        const topCard = document.querySelector('.card-stack .swipe-card:last-child');
        if (topCard) {
            topCard.classList.add('animating');
            topCard.style.transform = `translateX(-${window.innerWidth}px) rotate(-20deg)`;
            topCard.style.opacity = '0';
            setTimeout(() => handleSwipe('left'), 300);
        }
    };

    document.getElementById('btn-fav').onclick = () => {
        const topCard = document.querySelector('.card-stack .swipe-card:last-child');
        if (topCard) {
            topCard.classList.add('animating');
            topCard.style.transform = `translateX(${window.innerWidth}px) rotate(20deg)`;
            topCard.style.opacity = '0';
            setTimeout(() => handleSwipe('right'), 300);
        }
    };

    document.getElementById('btn-play').onclick = () => {
        if (currentCardIndex >= discoverQueue.length) return;
        const imam = discoverQueue[currentCardIndex];
        playAudio(imam);
    };

    // Reset discover
    const resetBtn = document.getElementById('reset-discover');
    if (resetBtn) {
        resetBtn.onclick = () => {
            currentCardIndex = 0;
            renderDiscoverCards();
        };
    }

    // Location toggle
    document.getElementById('location-toggle').addEventListener('click', toggleLocation);

    // City filter pills
    buildCityFilterPills();
}

function buildCityFilterPills() {
    const container = document.getElementById('filter-pills');
    const cities = [...new Set(imamsData.map(i => i.city))];

    container.innerHTML = '<button class="pill-btn active" data-filter="all">All</button>';
    cities.forEach(city => {
        const btn = document.createElement('button');
        btn.className = 'pill-btn';
        btn.dataset.filter = city;
        btn.textContent = city;
        container.appendChild(btn);
    });

    container.querySelectorAll('.pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            buildDiscoverQueue(btn.dataset.filter);
            renderDiscoverCards();
        });
    });
}

// ──────────────────────────────────────
// Location
// ──────────────────────────────────────
function toggleLocation() {
    const btn = document.getElementById('location-toggle');

    if (locationEnabled) {
        locationEnabled = false;
        userLocation = null;
        btn.classList.remove('location-active');
        buildDiscoverQueue();
        renderDiscoverCards();
        renderDirectory();
        showToast('Location disabled');
        return;
    }

    if (!navigator.geolocation) {
        showToast('Location not supported');
        return;
    }

    btn.textContent = 'Locating...';
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            locationEnabled = true;
            btn.classList.add('location-active');
            btn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Nearest`;
            const activeFilter = document.querySelector('#filter-pills .pill-btn.active');
            buildDiscoverQueue(activeFilter ? activeFilter.dataset.filter : 'all');
            renderDiscoverCards();
            renderDirectory();
            showToast('Showing nearest mosques');
        },
        () => {
            btn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Nearest`;
            showToast('Location access denied');
        },
        { enableHighAccuracy: true, timeout: 8000 }
    );
}

// ──────────────────────────────────────
// Directory Tab
// ──────────────────────────────────────
function renderDirectory(filter = {}) {
    const list = document.getElementById('directory-list');
    let pool = [...imamsData];

    // Apply filters
    if (filter.city) pool = pool.filter(i => i.city === filter.city);
    if (filter.style) pool = pool.filter(i => i.recitationStyle === filter.style);
    if (filter.type) pool = pool.filter(i => i.taraweehType === filter.type);
    if (filter.search) {
        const q = filter.search.toLowerCase();
        pool = pool.filter(i =>
            i.name.toLowerCase().includes(q) ||
            i.mosque.toLowerCase().includes(q) ||
            i.location.toLowerCase().includes(q)
        );
    }

    // Sort by distance if available
    if (locationEnabled && userLocation) {
        pool.forEach(imam => {
            imam._distance = haversine(
                userLocation.lat, userLocation.lng,
                imam.coordinates.lat, imam.coordinates.lng
            );
        });
        pool.sort((a, b) => a._distance - b._distance);
    }

    list.innerHTML = '';

    if (pool.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No imams found</h3>
                <p>Try adjusting your search or filters</p>
            </div>`;
        return;
    }

    pool.forEach(imam => {
        const isFav = favorites.includes(imam.id);
        const isPlaying = currentAudioImam && currentAudioImam.id === imam.id && !globalAudio.paused;
        const distText = imam._distance ? formatDistance(imam._distance) : imam.city;

        const item = document.createElement('div');
        item.className = 'dir-item';
        item.innerHTML = `
            <button class="dir-item-play ${isPlaying ? 'playing' : ''}" data-imam-id="${imam.id}" aria-label="Play ${imam.name}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    ${isPlaying
                        ? '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
                        : '<polygon points="5 3 19 12 5 21 5 3"/>'}
                </svg>
            </button>
            <div class="dir-item-info">
                <div class="dir-item-name">${imam.name}</div>
                <div class="dir-item-mosque">${imam.mosque}</div>
                <div class="dir-item-meta">${distText} · ${formatRecitationDays(imam.recitationStart, imam.recitationEnd)}</div>
            </div>
            <div class="dir-item-actions">
                <button class="dir-icon-btn ${isFav ? 'favorited' : ''}" data-fav-id="${imam.id}" aria-label="Favorite">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <a class="dir-icon-btn" href="https://www.google.com/maps/search/?api=1&query=${imam.coordinates.lat},${imam.coordinates.lng}" target="_blank" rel="noopener" aria-label="View on map">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </a>
            </div>
        `;

        // Play/pause
        item.querySelector('.dir-item-play').addEventListener('click', (e) => {
            e.stopPropagation();
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio(imam);
            }
        });

        // Toggle favorite
        item.querySelector('[data-fav-id]').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(imam.id);
            renderDirectory(getCurrentDirectoryFilter());
        });

        list.appendChild(item);
    });
}

function populateFilterOptions() {
    const cityFilter = document.getElementById('city-filter');
    const styleFilter = document.getElementById('style-filter');
    const typeFilter = document.getElementById('type-filter');

    const cities = [...new Set(imamsData.map(i => i.city))];
    const styles = [...new Set(imamsData.map(i => i.recitationStyle).filter(Boolean))];
    const types = [...new Set(imamsData.map(i => i.taraweehType).filter(Boolean))];

    cities.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c; opt.textContent = c;
        cityFilter.appendChild(opt);
    });

    styles.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s; opt.textContent = s;
        styleFilter.appendChild(opt);
    });

    types.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t; opt.textContent = t;
        typeFilter.appendChild(opt);
    });

    // Events
    [cityFilter, styleFilter, typeFilter].forEach(sel => {
        sel.addEventListener('change', () => renderDirectory(getCurrentDirectoryFilter()));
    });
}

function setupSearch() {
    const input = document.getElementById('search-input');
    let debounce;
    input.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => renderDirectory(getCurrentDirectoryFilter()), 250);
    });
}

function getCurrentDirectoryFilter() {
    return {
        city: document.getElementById('city-filter').value,
        style: document.getElementById('style-filter').value,
        type: document.getElementById('type-filter').value,
        search: document.getElementById('search-input').value.trim(),
    };
}

// ──────────────────────────────────────
// Stats Tab
// ──────────────────────────────────────
function renderStats() {
    const mosques = new Set(imamsData.map(i => i.mosque));
    const cities = new Set(imamsData.map(i => i.city));
    const withAudio = imamsData.filter(i => i.audioSample).length;

    document.getElementById('stat-mosques').textContent = mosques.size;
    document.getElementById('stat-imams').textContent = imamsData.length;
    document.getElementById('stat-cities').textContent = cities.size;
    document.getElementById('stat-audio').textContent = withAudio;

    // City breakdown
    const breakdown = document.getElementById('city-breakdown');
    const cityMap = {};
    imamsData.forEach(i => {
        cityMap[i.city] = (cityMap[i.city] || 0) + 1;
    });

    breakdown.innerHTML = '';
    Object.entries(cityMap).sort((a, b) => b[1] - a[1]).forEach(([city, count]) => {
        const card = document.createElement('div');
        card.className = 'city-card';
        card.innerHTML = `
            <div>
                <div class="city-name">${city}</div>
                <div class="city-count">${count} imam${count > 1 ? 's' : ''}</div>
            </div>
            <span class="city-badge">${count}</span>
        `;
        breakdown.appendChild(card);
    });
}

// ──────────────────────────────────────
// Audio Player
// ──────────────────────────────────────
function initAudioBar() {
    const playPauseBtn = document.getElementById('audio-play-pause');
    const rewindBtn = document.getElementById('audio-rewind');
    const forwardBtn = document.getElementById('audio-forward');
    const progressBar = document.getElementById('audio-progress-bar');

    playPauseBtn.addEventListener('click', () => {
        if (globalAudio.paused) {
            globalAudio.play();
        } else {
            globalAudio.pause();
        }
    });

    rewindBtn.addEventListener('click', () => {
        globalAudio.currentTime = Math.max(0, globalAudio.currentTime - 15);
    });

    forwardBtn.addEventListener('click', () => {
        globalAudio.currentTime = Math.min(globalAudio.duration, globalAudio.currentTime + 15);
    });

    // Progress bar click
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        globalAudio.currentTime = pct * globalAudio.duration;
    });

    // Audio events
    globalAudio.addEventListener('timeupdate', () => {
        if (globalAudio.duration) {
            const pct = (globalAudio.currentTime / globalAudio.duration) * 100;
            document.getElementById('audio-progress-fill').style.width = `${pct}%`;
        }
    });

    globalAudio.addEventListener('play', () => {
        document.querySelector('.icon-play').style.display = 'none';
        document.querySelector('.icon-pause').style.display = 'block';
        document.body.classList.add('audio-playing');
        updatePlayingStates();
    });

    globalAudio.addEventListener('pause', () => {
        document.querySelector('.icon-play').style.display = 'block';
        document.querySelector('.icon-pause').style.display = 'none';
        updatePlayingStates();
    });

    globalAudio.addEventListener('ended', () => {
        document.querySelector('.icon-play').style.display = 'block';
        document.querySelector('.icon-pause').style.display = 'none';
        document.body.classList.remove('audio-playing');
        updatePlayingStates();
    });
}

function playAudio(imam) {
    currentAudioImam = imam;
    globalAudio.src = imam.audioSample;
    globalAudio.play().catch(() => showToast('Audio failed to load'));

    // Update bar
    document.getElementById('audio-bar').style.display = 'block';
    document.getElementById('audio-title').textContent = imam.name;
    document.getElementById('audio-mosque').textContent = imam.mosque;
    document.getElementById('audio-progress-fill').style.width = '0%';

    updatePlayingStates();
}

function pauseAudio() {
    globalAudio.pause();
}

function updatePlayingStates() {
    // Update directory play buttons
    document.querySelectorAll('.dir-item-play').forEach(btn => {
        const id = parseInt(btn.dataset.imamId);
        const isThis = currentAudioImam && currentAudioImam.id === id && !globalAudio.paused;
        btn.classList.toggle('playing', isThis);
        btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            ${isThis
                ? '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
                : '<polygon points="5 3 19 12 5 21 5 3"/>'}
        </svg>`;
    });
}

// ──────────────────────────────────────
// Favorites
// ──────────────────────────────────────
function addFavorite(id) {
    if (!favorites.includes(id)) {
        favorites.push(id);
        saveFavorites();
    }
}

function removeFavorite(id) {
    favorites = favorites.filter(f => f !== id);
    saveFavorites();
}

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        removeFavorite(id);
    } else {
        addFavorite(id);
    }
}

function saveFavorites() {
    localStorage.setItem('taraweeh_favs', JSON.stringify(favorites));
    updateFavCount();
}

function updateFavCount() {
    const el = document.getElementById('fav-count');
    el.textContent = favorites.length;
    el.classList.toggle('show', favorites.length > 0);
}

function renderFavoritesList() {
    const list = document.getElementById('favorites-list');
    const emptyEl = document.getElementById('empty-favorites');
    const favImams = imamsData.filter(i => favorites.includes(i.id));

    if (favImams.length === 0) {
        list.innerHTML = '';
        list.appendChild(emptyEl);
        emptyEl.style.display = 'block';
        return;
    }

    emptyEl.style.display = 'none';
    list.innerHTML = '';

    favImams.forEach(imam => {
        const item = document.createElement('div');
        item.className = 'dir-item';
        item.innerHTML = `
            <button class="dir-item-play" data-imam-id="${imam.id}" aria-label="Play ${imam.name}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </button>
            <div class="dir-item-info">
                <div class="dir-item-name">${imam.name}</div>
                <div class="dir-item-mosque">${imam.mosque}</div>
            </div>
            <div class="dir-item-actions">
                <button class="dir-icon-btn favorited" data-remove-fav="${imam.id}" aria-label="Remove from favorites">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <a class="dir-icon-btn" href="https://www.google.com/maps/search/?api=1&query=${imam.coordinates.lat},${imam.coordinates.lng}" target="_blank" rel="noopener" aria-label="View on map">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </a>
            </div>
        `;

        item.querySelector('.dir-item-play').addEventListener('click', (e) => {
            e.stopPropagation();
            playAudio(imam);
        });

        item.querySelector('[data-remove-fav]').addEventListener('click', (e) => {
            e.stopPropagation();
            removeFavorite(imam.id);
            renderFavoritesList();
            renderDirectory(getCurrentDirectoryFilter());
        });

        list.appendChild(item);
    });
}

// ──────────────────────────────────────
// Deep Link (hash-based)
// ──────────────────────────────────────
function handleDeepLink() {
    const hash = window.location.hash;
    if (hash.startsWith('#imam-')) {
        const id = parseInt(hash.replace('#imam-', ''));
        if (id) {
            // Wait for data to load then scroll to imam
            const check = setInterval(() => {
                if (imamsData.length > 0) {
                    clearInterval(check);
                    const imam = imamsData.find(i => i.id === id);
                    if (imam) {
                        // Switch to directory tab and highlight
                        document.querySelector('.tab[data-tab="directory"]').click();
                        playAudio(imam);
                        showToast(`Now playing: ${imam.name}`);
                    }
                }
            }, 200);
        }
    }
}

// ──────────────────────────────────────
// Utility Functions
// ──────────────────────────────────────
function formatRecitationDays(start, end) {
    if (start === 1 && end === 30) return 'All Ramadan';
    if (start === end) return `Day ${start}`;
    return `Day ${start}–${end}`;
}

function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(km) {
    if (km < 1) return `${Math.round(km * 1000)}m away`;
    return `${km.toFixed(1)}km away`;
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}