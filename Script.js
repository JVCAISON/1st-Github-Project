const films = [
    { id: 1, title: 'Casablanca', year: 1942, genre: 'romance', runtime: 102, director: 'Michael Curtiz', rating: '4.9/5', color: '#d1a06a', reason: 'A flawless blend of romance, politics, and hard-boiled dialogue.', synopsis: 'A nightclub owner in wartime Casablanca must choose between love and duty when an old flame walks back into his life.' },
    { id: 2, title: 'The Godfather', year: 1972, genre: 'crime', runtime: 175, director: 'Francis Ford Coppola', rating: '5/5', color: '#3d2b1f', reason: 'The benchmark for gangster cinema and slow-burn power drama.', synopsis: 'The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.' },
    { id: 3, title: 'Do the Right Thing', year: 1989, genre: 'drama', runtime: 120, director: 'Spike Lee', rating: '4.8/5', color: '#c44b3a', reason: 'A vibrant, urgent snapshot of community tension that still feels current.', synopsis: 'On the hottest day of the year, tensions rise in a Brooklyn neighborhood and everything begins to crack.' },
    { id: 4, title: 'Spirited Away', year: 2001, genre: 'animation', runtime: 125, director: 'Hayao Miyazaki', rating: '5/5', color: '#4f7db8', reason: 'A breathtaking journey with imagination, heart, and iconic visual storytelling.', synopsis: 'A young girl enters a world of spirits and must find the courage to save her parents and herself.' },
    { id: 5, title: 'Parasite', year: 2019, genre: 'thriller', runtime: 132, director: 'Bong Joon-ho', rating: '5/5', color: '#3a5f4c', reason: 'Tense, funny, and devastating. It rewards every rewatch.', synopsis: 'Two families from different worlds become entangled in a relationship that turns increasingly dangerous.' },
    { id: 6, title: '2001: A Space Odyssey', year: 1968, genre: 'sci-fi', runtime: 149, director: 'Stanley Kubrick', rating: '4.7/5', color: '#5d5d8f', reason: 'A monumental science-fiction experience that defined cinematic ambition.', synopsis: 'Human evolution and artificial intelligence collide across a mysterious voyage into the unknown.' },
    { id: 7, title: 'The Shawshank Redemption', year: 1994, genre: 'drama', runtime: 142, director: 'Frank Darabont', rating: '4.9/5', color: '#6e7f95', reason: 'A deeply human story of hope, resilience, and friendship.', synopsis: 'Two imprisoned men bond over years as they navigate confinement and the possibility of freedom.' },
    { id: 8, title: 'In the Mood for Love', year: 2000, genre: 'romance', runtime: 98, director: 'Wong Kar-wai', rating: '4.8/5', color: '#9b5778', reason: 'Elegant, restrained, and emotionally unforgettable.', synopsis: 'Two neighbors form an intimate connection while quietly confronting betrayal and longing.' },
    { id: 9, title: 'Mad Max: Fury Road', year: 2015, genre: 'action', runtime: 120, director: 'George Miller', rating: '4.9/5', color: '#d46b2c', reason: 'An action masterpiece built on rhythm, clarity, and pure momentum.', synopsis: 'A fugitive and a rebel warrior race across the desert in a relentless battle for survival.' },
    { id: 10, title: 'The Silence of the Lambs', year: 1991, genre: 'thriller', runtime: 118, director: 'Jonathan Demme', rating: '4.8/5', color: '#6a6358', reason: 'A precise psychological thriller with unforgettable performances.', synopsis: 'An FBI trainee seeks the help of an imprisoned cannibal to catch a serial killer.' },
    { id: 11, title: 'Moonlight', year: 2016, genre: 'drama', runtime: 111, director: 'Barry Jenkins', rating: '4.8/5', reason: 'A tender, luminous coming-of-age film told with uncommon care.', synopsis: 'A young man grows through childhood, adolescence, and adulthood while searching for identity and connection.', color: '#6c5ea8' },
    { id: 12, title: 'Jaws', year: 1975, genre: 'thriller', runtime: 124, director: 'Steven Spielberg', rating: '4.7/5', reason: 'The original summer blockbuster and still one of the tightest thrillers ever made.', synopsis: 'A coastal town faces terror when a great white shark begins attacking swimmers.', color: '#247b9d' }
];

const PAGE_SIZE = 6;

const dom = {
    searchInput: document.getElementById('searchInput'),
    randomButton: document.getElementById('randomButton'),
    clearButton: document.getElementById('clearButton'),
    prevButton: document.getElementById('prevButton'),
    nextButton: document.getElementById('nextButton'),
    genreFilter: document.getElementById('genreFilter'),
    pageLabel: document.getElementById('pageLabel'),
    resultsLabel: document.getElementById('resultsLabel'),
    filmCount: document.getElementById('filmCount'),
    filmList: document.getElementById('filmList'),
    filmDetail: document.getElementById('filmDetail')
};

let page = 0;
let selectedGenre = 'all';
let searchTerm = '';
let selectedFilmId = films[0].id;

function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;
    return hours ? `${hours}h ${remaining}m` : `${minutes}m`;
}

function buildPosterLabel(film) {
    return `${film.title}\n${film.year}`;
}

function getFilteredFilms() {
    return films.filter((film) => {
        const matchesSearch = film.title.toLowerCase().includes(searchTerm) || film.genre.includes(searchTerm) || film.director.toLowerCase().includes(searchTerm);
        const matchesGenre = selectedGenre === 'all' || film.genre === selectedGenre;
        return matchesSearch && matchesGenre;
    });
}

function renderGenreOptions() {
    const genres = [...new Set(films.map((film) => film.genre))].sort();
    genres.forEach((genre) => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre.charAt(0).toUpperCase() + genre.slice(1);
        dom.genreFilter.appendChild(option);
    });
}

function renderDetail(film) {
    dom.filmDetail.innerHTML = `
        <div class="detail-header">
            <div class="poster" style="background: linear-gradient(160deg, ${film.color}, #11151d);">
                <span>${buildPosterLabel(film).replace(/\n/g, '<br>')}</span>
            </div>
            <div class="detail-title">
                <p class="number">#${String(film.id).padStart(2, '0')}</p>
                <h3>${film.title}</h3>
                <div class="chip-list">
                    <span class="chip">${film.genre}</span>
                    <span class="chip">${film.year}</span>
                    <span class="chip">${formatRuntime(film.runtime)}</span>
                </div>
            </div>
        </div>

        <div class="detail-grid">
            <section class="panel">
                <h4>Why watch it?</h4>
                <p>${film.reason}</p>
            </section>

            <section class="panel">
                <h4>Credits</h4>
                <p><strong>Director:</strong> ${film.director}</p>
                <p><strong>Runtime:</strong> ${formatRuntime(film.runtime)}</p>
                <p><strong>Rating:</strong> ${film.rating}</p>
            </section>

            <section class="panel" style="grid-column: 1 / -1;">
                <h4>Synopsis</h4>
                <p>${film.synopsis}</p>
            </section>
        </div>
    `;
}

function renderList() {
    const filtered = getFilteredFilms();
    const start = page * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    dom.filmCount.textContent = String(films.length);
    dom.resultsLabel.textContent = `${filtered.length} films matched your filters`;
    dom.pageLabel.textContent = filtered.length ? `Showing ${start + 1} - ${Math.min(start + PAGE_SIZE, filtered.length)}` : 'No matches';
    dom.prevButton.disabled = start === 0;
    dom.nextButton.disabled = start + PAGE_SIZE >= filtered.length;

    if (!filtered.length) {
        dom.filmList.innerHTML = '<div class="error">No films matched your search.</div>';
        dom.filmDetail.innerHTML = '<p class="hint">Try a different title, genre, or reset the filters.</p>';
        return;
    }

    dom.filmList.innerHTML = pageItems
        .map((film) => `
            <button class="film-item" type="button" data-id="${film.id}">
                <div>
                    <div class="film-item-name">${film.title}</div>
                    <div class="film-item-year">${film.year} · ${film.genre}</div>
                </div>
                <div class="film-item-year">${film.rating}</div>
            </button>
        `)
        .join('');

    const activeFilm = filtered.find((film) => film.id === selectedFilmId) || pageItems[0];
    if (!activeFilm || !pageItems.some((film) => film.id === activeFilm.id)) {
        selectedFilmId = pageItems[0].id;
        renderDetail(pageItems[0]);
    } else {
        renderDetail(activeFilm);
    }
}

function resetFilters() {
    searchTerm = '';
    selectedGenre = 'all';
    page = 0;
    selectedFilmId = films[0].id;
    dom.searchInput.value = '';
    dom.genreFilter.value = 'all';
    renderList();
}

function bindEvents() {
    dom.searchInput.addEventListener('input', (event) => {
        searchTerm = event.target.value.trim().toLowerCase();
        page = 0;
        renderList();
    });

    dom.genreFilter.addEventListener('change', (event) => {
        selectedGenre = event.target.value;
        page = 0;
        renderList();
    });

    dom.randomButton.addEventListener('click', () => {
        const filtered = getFilteredFilms();
        const pool = filtered.length ? filtered : films;
        const film = pool[Math.floor(Math.random() * pool.length)];
        selectedFilmId = film.id;
        renderDetail(film);
    });

    dom.clearButton.addEventListener('click', resetFilters);

    dom.prevButton.addEventListener('click', () => {
        page = Math.max(0, page - 1);
        renderList();
    });

    dom.nextButton.addEventListener('click', () => {
        page += 1;
        renderList();
    });

    dom.filmList.addEventListener('click', (event) => {
        const item = event.target.closest('.film-item');
        if (!item) {
            return;
        }

        selectedFilmId = Number(item.dataset.id);
        const film = films.find((entry) => entry.id === selectedFilmId);
        renderDetail(film);
    });
}

renderGenreOptions();
bindEvents();
renderList();
