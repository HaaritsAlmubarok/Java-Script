console.log('=== SKL 2 - RECIPE FINDER ===');

// Mengambil elemen HTML
const $searchForm = document.querySelector('#search-form');
const $searchInput = document.querySelector('#search-input');
const $cuisineFilter = document.querySelector('#cuisine-filter');
const $difficultyFilter = document.querySelector('#difficulty-filter');

const $recipeGrid = document.querySelector('#recipe-grid');
const $loadingState = document.querySelector('#loading-state');
const $errorState = document.querySelector('#error-state');
const $emptyState = document.querySelector('#empty-state');

const $recipeCount = document.querySelector('#recipe-count');
const $sectionTitle = document.querySelector('#section-title');

const $favoriteButton = document.querySelector('#favorite-button');
const $favoriteCount = document.querySelector('#favorite-count');

const $resetFilterButton = document.querySelector('#reset-filter-button');

const $recipeDialog = document.querySelector('#recipe-dialog');
const $dialogContent = document.querySelector('#dialog-content');
const $closeDialog = document.querySelector('#close-dialog');

const $emptyTitle = $emptyState.querySelector('h3');
const $emptyDescription = $emptyState.querySelector('p');

// Mengubah tulisan di bagian atas halaman
const $heroTag = document.querySelector('.eyebrow');
const $heroTitle = document.querySelector('h1');

$heroTag.textContent = '🔥 RECIPE FINDER APP';
$heroTitle.textContent = 'Find your favorite recipe all over the world!';

$heroTag.style.color = '#19446f';
$heroTag.style.backgroundColor = '#f3f2f274';
$heroTitle.style.color = 'gold';

// Tempat menyimpan semua resep dari API
const recipesDataLocal = [];

// Menyimpan pilihan pencarian dan filter
const filters = {
  search: '',
  cuisine: '',
  difficulty: ''
};

// Menyimpan daftar ID resep favorit
let favoriteIds = [];

// Menandai apakah pengguna sedang melihat favorit
let showingFavorites = false;

// Mengambil filter yang pernah disimpan
const savedFilters = JSON.parse(
  localStorage.getItem('filters') || '{}'
);

filters.search =
  localStorage.getItem('searchValue') ||
  savedFilters.search ||
  '';

filters.cuisine = savedFilters.cuisine || '';
filters.difficulty = savedFilters.difficulty || '';

// Menampilkan kata kunci yang pernah dicari
$searchInput.value = filters.search;

// Mengambil daftar favorit yang tersimpan
try {
  favoriteIds = JSON.parse(
    localStorage.getItem('favoriteRecipes') || '[]'
  );

  if (!Array.isArray(favoriteIds)) {
    favoriteIds = [];
  }
} catch (error) {
  favoriteIds = [];
}

// Menyimpan pilihan pencarian dan filter
function saveFilters() {
  localStorage.setItem('searchValue', filters.search);
  localStorage.setItem('filters', JSON.stringify(filters));
}

// Menyimpan favorit dan memperbarui jumlahnya
function saveFavorites() {
  localStorage.setItem(
    'favoriteRecipes',
    JSON.stringify(favoriteIds)
  );

  updateFavoriteCount();
}

// Memperbarui angka favorit
function updateFavoriteCount() {
  $favoriteCount.textContent = favoriteIds.length;
}

async function getRecipesApi() {
  const response = await fetch(
    'https://dummyjson.com/recipes?limit=0'
  );

  if (!response.ok) {
    throw new Error('Gagal mengambil data resep.');
  }

  const data = await response.json();

  return data.recipes;
}

function renderFilterOptions() {
  // Mengambil jenis masakan yang tidak berulang
  const cuisines = [
    ...new Set(recipesDataLocal.map(recipe => recipe.cuisine))
  ].sort();

  // Mengambil tingkat kesulitan yang tidak berulang
  const difficulties = [
    ...new Set(recipesDataLocal.map(recipe => recipe.difficulty))
  ].sort();

  // Membuat pilihan awal dropdown
  $cuisineFilter.innerHTML =
    '<option value="">All Cuisine</option>';

  $difficultyFilter.innerHTML =
    '<option value="">All Difficulty</option>';

  // Memasukkan jenis masakan ke dropdown
  for (const cuisine of cuisines) {
    $cuisineFilter.innerHTML += `
      <option value="${cuisine}">${cuisine}</option>
    `;
  }

  // Memasukkan tingkat kesulitan ke dropdown
  for (const difficulty of difficulties) {
    $difficultyFilter.innerHTML += `
      <option value="${difficulty}">${difficulty}</option>
    `;
  }

  // Mengembalikan pilihan filter yang tersimpan
  $cuisineFilter.value = filters.cuisine;
  $difficultyFilter.value = filters.difficulty;
}

function getFilteredRecipes() {
  const keyword = filters.search.toLowerCase();

  return recipesDataLocal.filter(recipe => {
    // Teks yang bisa dicari
    const recipeText = [
      recipe.name,
      recipe.cuisine,
      recipe.description,
      ...(recipe.ingredients || []),
      ...(recipe.tags || []),
      ...(recipe.mealType || [])
    ].join(' ').toLowerCase();

    // Memeriksa kata kunci pencarian
    const matchesSearch = recipeText.includes(keyword);

    // Memeriksa jenis masakan
    const matchesCuisine =
      !filters.cuisine ||
      recipe.cuisine === filters.cuisine;

    // Memeriksa tingkat kesulitan
    const matchesDifficulty =
      !filters.difficulty ||
      recipe.difficulty === filters.difficulty;

    // Memeriksa apakah resep termasuk favorit
    const matchesFavorite =
      !showingFavorites ||
      favoriteIds.includes(recipe.id);

    // Semua kondisi harus cocok
    return (
      matchesSearch &&
      matchesCuisine &&
      matchesDifficulty &&
      matchesFavorite
    );
  });
}

function renderRecipes() {
  const recipesToShow = getFilteredRecipes();

  let recipeCards = '';

  for (const recipe of recipesToShow) {
    const isFavorite = favoriteIds.includes(recipe.id);

    const cookingTime =
      recipe.prepTimeMinutes + recipe.cookTimeMinutes;

    recipeCards += `
      <article class="recipe-card">

        <img
          class="recipe-image"
          src="${recipe.image}"
          alt="${recipe.name}"
        >

        <div class="recipe-body">

          <span class="recipe-cuisine">
            ${recipe.cuisine}
          </span>

          <h3 class="recipe-title">
            ${recipe.name}
          </h3>

          <div class="recipe-meta">
            <span>⭐ ${recipe.rating}</span>
            <span>⏱️ ${cookingTime} min</span>
            <span>${recipe.difficulty}</span>
          </div>

          <div class="recipe-actions">

            <button
              class="detail-button"
              onclick="showRecipeDetail(${recipe.id})"
            >
              View Detail
            </button>

            <button
              class="like-button"
              onclick="toggleFavorite(${recipe.id})"
              title="Favorite"
            >
              ${isFavorite ? '♥' : '♡'}
            </button>

          </div>
        </div>
      </article>
    `;
  }

  // Menampilkan kartu resep
  $recipeGrid.innerHTML = recipeCards;

  // Menampilkan pesan jika resep tidak ditemukan
  $recipeGrid.hidden = recipesToShow.length === 0;
  $emptyState.hidden = recipesToShow.length !== 0;

  // Mengubah judul sesuai halaman yang dilihat
  $sectionTitle.textContent = showingFavorites
    ? 'Favorite Recipes'
    : 'Explore Recipes';

  $emptyTitle.textContent = showingFavorites
    ? '❤️ No favorite recipes yet'
    : '🔍 Recipe not found';

  $emptyDescription.textContent = showingFavorites
    ? 'Tap the heart on a recipe card to save it here.'
    : 'Try another keyword or filter.';

  // Menghitung resep yang ditampilkan
  $recipeCount.textContent =
    `${recipesToShow.length} recipe(s)`;

  // Menampilkan tombol reset jika filter digunakan
  $resetFilterButton.hidden =
    !filters.search &&
    !filters.cuisine &&
    !filters.difficulty;
}

function toggleFavorite(recipeId) {
  // Jika sudah favorit, hapus dari daftar
  if (favoriteIds.includes(recipeId)) {
    favoriteIds = favoriteIds.filter(id => id !== recipeId);
  } else {
    // Jika belum favorit, tambahkan ke daftar
    favoriteIds.push(recipeId);
  }

  // Simpan dan tampilkan ulang resep
  saveFavorites();
  renderRecipes();
}

function showRecipeDetail(recipeId) {
  // Mencari resep berdasarkan ID
  const recipe = recipesDataLocal.find(
    item => item.id === recipeId
  );

  if (!recipe) return;

  // Membuat daftar bahan
  let ingredients = '';

  for (const ingredient of recipe.ingredients || []) {
    ingredients += `<li>${ingredient}</li>`;
  }

  // Membuat langkah memasak
  let instructions = '';

  for (let i = 0; i < (recipe.instructions || []).length; i++) {
    instructions += `
      <p>${i + 1}. ${recipe.instructions[i]}</p>
    `;
  }

  const cookingTime =
    recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  // Menampilkan detail resep
  $dialogContent.innerHTML = `
    <img
      class="dialog-image"
      src="${recipe.image}"
      alt="${recipe.name}"
    >

    <div class="dialog-body">

      <span class="recipe-cuisine">
        ${recipe.cuisine}
      </span>

      <h2>${recipe.name}</h2>

      <div class="dialog-meta">
        <span>⭐ ${recipe.rating}</span>
        <span>⏱️ ${cookingTime} min</span>
        <span>${recipe.difficulty}</span>
      </div>

      <h3>Ingredients</h3>
      <ul class="ingredients">
        ${ingredients}
      </ul>

      <h3>Instructions</h3>
      <div class="instructions">
        ${instructions}
      </div>

    </div>
  `;

  // Membuka jendela detail
  $recipeDialog.showModal();
}

$searchForm.addEventListener('submit', function (event) {
  // Mencegah halaman refresh
  event.preventDefault();

  // Mengambil kata kunci dari input
  filters.search = $searchInput.value.trim();

  // Menyimpan pencarian
  saveFilters();

  // Menampilkan hasil pencarian
  renderRecipes();

  // Menampilkan gambar dan memutar audio
  showJumpscare();

  console.log('Pencarian resep:', filters);
});

// Ketika jenis masakan berubah
$cuisineFilter.addEventListener('change', function () {
  filters.cuisine = $cuisineFilter.value;

  saveFilters();
  renderRecipes();
});

// Ketika tingkat kesulitan berubah
$difficultyFilter.addEventListener('change', function () {
  filters.difficulty = $difficultyFilter.value;

  saveFilters();
  renderRecipes();
});

// Menghapus semua filter pencarian
$resetFilterButton.addEventListener('click', function () {
  filters.search = '';
  filters.cuisine = '';
  filters.difficulty = '';

  $searchInput.value = '';
  $cuisineFilter.value = '';
  $difficultyFilter.value = '';

  saveFilters();
  renderRecipes();
});

// Menampilkan atau menyembunyikan resep favorit
$favoriteButton.addEventListener('click', function () {
  showingFavorites = !showingFavorites;

  $favoriteButton.setAttribute(
    'aria-pressed',
    String(showingFavorites)
  );

  renderRecipes();
});

// Menutup detail resep
$closeDialog.addEventListener('click', function () {
  $recipeDialog.close();
});

// Menutup detail jika area luar dialog diklik
$recipeDialog.addEventListener('click', function (event) {
  if (event.target === $recipeDialog) {
    $recipeDialog.close();
  }
});


// Fungsi utama untuk menjalankan aplikasi
async function main() {
  try {
    $loadingState.hidden = false;
    $errorState.hidden = true;

    // Mengambil resep dari API
    const recipes = await getRecipesApi();

    // Menyimpan resep ke variabel utama
    recipesDataLocal.push(...recipes);

    // Mengisi dropdown filter
    renderFilterOptions();

    // Menghilangkan loading
    $loadingState.hidden = true;

    // Memperbarui jumlah favorit
    updateFavoriteCount();

    // Menampilkan semua resep
    renderRecipes();

  } catch (error) {
    console.error(error);

    // Jika API gagal
    $loadingState.hidden = true;
    $errorState.hidden = false;
  }
}

// Menjalankan aplikasi
main();








// Lokasi file audio dan gambar
const jumpscareAudio = new Audio('audio/audio.mp3');
const jumpscareImage = 'image/download.jpg';

// Menyimpan timer gambar
let jumpscareTimeout;

function showJumpscare() {
  // Menghapus gambar sebelumnya jika masih ada
  const oldImage = document.querySelector('#jumpscare-overlay');

  if (oldImage) {
    oldImage.remove();
  }

  // Membatalkan timer sebelumnya
  clearTimeout(jumpscareTimeout);

  // Membuat gambar
  const image = document.createElement('img');

  image.id = 'jumpscare-overlay';
  image.src = jumpscareImage;
  image.alt = '';

  // Membuat gambar memenuhi layar
  image.style.position = 'fixed';
  image.style.inset = '0';
  image.style.width = '100vw';
  image.style.height = '100vh';
  image.style.objectFit = 'cover';
  image.style.zIndex = '999999';
  image.style.pointerEvents = 'none';

  // Menampilkan gambar
  document.body.appendChild(image);

  // Memutar audio dari awal
  jumpscareAudio.currentTime = 0;

  jumpscareAudio.play().catch(function (error) {
    console.log('Audio tidak bisa diputar:', error);
  });

  // Menghapus gambar setelah 1 detik
  jumpscareTimeout = setTimeout(function () {
    image.remove();
  }, 1000);
}