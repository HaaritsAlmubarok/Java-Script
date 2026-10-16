console.log('=== SKL 2 - RECIPE FINDER ===');
// koleksi data resep dari api (aksesnya global bisa di semua function)
const recipesDataLocal = [];
// awalan $ berarti dia elemen DOM
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const $buttonFavorites = document.querySelector('#button-favorites');
const $recipeCount = document.querySelector('#recipe-count')
const $cuisineFilter = document.querySelector('#cuisine-filter');
const $difficultyFilter = document.querySelector('#difficulty-filter');
const $searchForm = document.getElementById('search-form'); // by id value
const $searchInput = document.querySelector('#search-input'); // by id (pke #)
const $heroTag = document.querySelector('.eyebrow'); // by class (pke .)
const $heroTitle = document.querySelector('h1'); // by tag
// mengganti konten teks di elemen DOM
$heroTag.textContent = '🔥 RECIPE FINDER APP';
$heroTitle.textContent = 'Find your favorite recipe all over the world';
// menambahkan style ke elemen DOM
$heroTag.style.color = '#000';
$heroTag.style.backgroundColor = '#fff';
$heroTitle.style.color = 'gold';

// targetkan element nya secara lebih spesifik 
// const $searchBtn = document.querySelector('button[type="submit"]');
const $searchBtn = document.querySelector('#search-form button');
// console.log($searchBtn);
// ada berbagai macam event semisal: click, change, input, submit
const searchValue = localStorage.getItem('searchValue');
const filters = { cuisine: 'indian', difficulty: 'hard', search: '' };
$searchBtn.addEventListener('click', function (e) {
  e.preventDefault(); // mencegah halaman auto refresh atau submit
  const searchValue = $searchInput.value;
  const filteredRecipes = recipesDataLocal.filter(recipe => recipe.name.toLowerCase().includes(searchValue.toLowerCase()));
  renderRecipes(searchValue === '' ? recipesDataLocal : filteredRecipes);
});

function renderRecipes(recipesData) {
  const $recipeGrid = document.querySelector('#recipe-grid');
  const $loadingState = document.querySelector('#loading-state');
  $loadingState.style.display = 'none';
  const totalRecipe = recipesData.length;
  $recipeCount.textContent = `Total Recipes: ${totalRecipe}`;
  // kumpulkan data resep ke dalam string html
  let recipeCards = '';
  // for (const recipe of recipesData) {
  for (let i = 0; i < recipesData.length; i++) {
    const recipe = recipesData[i];
    recipeCards += `
      <article class="recipe-card">
        <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}">

        <div class="recipe-body">
          <span class="recipe-cuisine">${recipe.cuisine}</span>
          <h3 class="recipe-title">${recipe.name}</h3>

          <div class="recipe-meta">
            <span>⭐ ${recipe.rating}</span>
            <span>⏱ ${recipe.cookTimeMinutes} min</span>
            <span>${recipe.difficulty}</span>
          </div>

          <div class="recipe-actions">
            <button class="detail-button" onclick="showRecipeDetail(${recipe.id})">
              View Detail
            </button>

            <button class="like-button" onclick="toggleFavorite(${recipe.id})" title="Favorite">
              ♡
            </button>
          </div>
        </div>
      </article>
    `;
  }
  // render ke UI via innerHTML
  $recipeGrid.innerHTML = recipeCards;
}

async function getRecipesApi() {
  const response = await fetch('https://dummyjson.com/recipes');
  const data = await response.json();
  // destructuring assignment = membuat variable dari key objects
  const { recipes, total, skip, limit } = data;
  return recipes; // kembalikan data resep2 nya saja
};

function renderFilterCuisine(cuisineList) {
  let cuisineOptions = '<option value="">All Cuisine</option>';
  for (let i = 0; i < cuisineList.length; i++) {
    const cuisine = cuisineList[i];
    cuisineOptions += `<option value="${cuisine}">${cuisine}</option>`;
  }
  $cuisineFilter.innerHTML = cuisineOptions;
}

$cuisineFilter.addEventListener('change', function (e) {
  const selectedCuisine = e.target.value; // apa yg user pilih
  // jika user memilih All Cuisine, maka render semua data resep api
  if (selectedCuisine === '') { // value kosong => All Cuisine
    renderRecipes(recipesDataLocal); // render semua kyok awal
  } else {
    // filter data resep berdasarkan cuisine yang dipilih
    const filteredRecipes = recipesDataLocal.filter(recipe => recipe.cuisine === selectedCuisine);
    renderRecipes(filteredRecipes); // render per filter cuisine
  }
});

$difficultyFilter.addEventListener('change', function (e) {
  const selectedDifficulty = e.target.value; // apa yg user pilih
  // filter data resep berdasarkan difficulty yang dipilih
  const filteredRecipes = recipesDataLocal.filter(recipe => recipe.difficulty === selectedDifficulty);
  renderRecipes(selectedDifficulty === '' ? recipesDataLocal : filteredRecipes);
});


async function main() {
  const recipesData = await getRecipesApi();
  // kumpulkan seluruh data cuisine ke dalam array 
  recipesDataLocal.push(...recipesData);
  // lalu taruh di filter dropdown cuisine
  const cuisineList = recipesData.map(recipe => recipe.cuisine)
    .filter((item, index, arr) => arr.indexOf(item) === index)
    .sort();
  // render filter dropdown cuisine ke UI
  renderFilterCuisine(cuisineList);
  // render semua data resep api ke UI
  renderRecipes(recipesData);
}

// load main funtion
main();