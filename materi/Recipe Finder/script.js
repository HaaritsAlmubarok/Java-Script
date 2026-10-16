console.log('=== SKL 2 - RECIPE FINDER ===');

// mengambil elemen-elemen HTML menggunakan document.getElementById().
const $searchForm = document.getElementById('search-form');
const $searchInput = document.getElementById('search-input');
const $cuisineFilter = document.getElementById('cuisine-filter');
const $difficultyFilter = document.getElementById('difficulty-filter');

// ========== Dari AI ===========
const $recipeGrid = document.getElementById('recipe-grid');
const $loadingState = document.getElementById('loading-state');
const $errorState = document.getElementById('error-state');
const $emptyState = document.getElementById('empty-state');
const $recipeCount = document.getElementById('recipe-count');
const $sectionTitle = document.getElementById('section-title');
const $emptyTitle = $emptyState.querySelector('h3');
const $emptyDescription = $emptyState.querySelector('p');
const $favoriteButton = document.getElementById('favorite-button');
const $favoriteCount = document.getElementById('favorite-count');
const $recipeDialog = document.getElementById('recipe-dialog');
const $dialogContent = document.getElementById('dialog-content');
const $closeDialog = document.getElementById('close-dialog');

const $resetFilterButton = document.getElementById('reset-filter-button');

const FILTER_STORAGE_KEY = 'filters';
const FAVORITES_STORAGE_KEY = 'favoriteRecipes';

// document.querySelector() digunakan untuk memilih elemen berdasarkan selector CSS
const $heroTag = document.querySelector('.eyebrow');
const $heroTitle = document.querySelector('h1');

$heroTag.textContent = '🔥 RECIPE FINDER K*NT*L!';
$heroTitle.textContent = 'Find your favorite recipe all over the world!';
$heroTag.style.color = '#19446f';
$heroTag.style.backgroundColor = '#f3f2f274';
$heroTitle.style.color = 'gold';

// ==============================
// FILTER STORAGE
// ==============================

// loadFilters() mengambil filter yang sebelumnya disimpan, seperti kata kunci pencarian, jenis masakan, dan tingkat kesulitan
function loadFilters() {
    const savedFilters = localStorage.getItem(FILTER_STORAGE_KEY);
    let parsedFilters = {};

    if (savedFilters) {
        try {
            const value = JSON.parse(savedFilters);

            if (value && typeof value === 'object') {
                parsedFilters = value;
            }
        } catch (error) {
            console.error('Could not read saved recipe filters:', error);
        }
    }

    return {
        cuisine: typeof parsedFilters.cuisine === 'string'
            ? parsedFilters.cuisine
            : '',
        difficulty: typeof parsedFilters.difficulty === 'string'
            ? parsedFilters.difficulty
            : '',
        search: localStorage.getItem('searchValue') || (
            typeof parsedFilters.search === 'string'
                ? parsedFilters.search
                : ''
        )
    };
}

const filters = loadFilters();

let recipes = [];
let favoriteIds = loadFavoriteIds();
let showingFavorites = false;

$searchInput.value = filters.search;

function loadFavoriteIds() {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!savedFavorites) {
        return [];
    }

    try {
        const value = JSON.parse(savedFavorites);

        if (Array.isArray(value)) {
            return value.filter(Number.isInteger);
        }
    } catch (error) {
        console.error('Could not read saved favorite recipes:', error);
    }

    return [];
}

function saveFilters() {
    localStorage.setItem('searchValue', filters.search);
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters));
}

function saveFavoriteIds() {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
}

function updateFavoriteButton() {
    $favoriteCount.textContent = favoriteIds.length;
    $favoriteButton.setAttribute('aria-pressed', String(showingFavorites));
}

function toggleFavorite(recipeId) {
    if (favoriteIds.includes(recipeId)) {
        favoriteIds = favoriteIds.filter(function (id) {
            return id !== recipeId;
        });
    } else {
        favoriteIds.push(recipeId);
    }

    saveFavoriteIds();
    updateFavoriteButton();
    renderRecipes();
}

function showRecipeDetail(recipeId) {
    const recipe = recipes.find(function (item) {
        return item.id === recipeId;
    });

    if (!recipe) {
        return;
    }

    const image = document.createElement('img');
    image.className = 'dialog-image';
    image.src = recipe.image;
    image.alt = recipe.name;

    const body = document.createElement('div');
    body.className = 'dialog-body';

    const cuisine = document.createElement('span');
    cuisine.className = 'recipe-cuisine';
    cuisine.textContent = recipe.cuisine;

    const title = document.createElement('h2');
    title.textContent = recipe.name;

    const meta = document.createElement('div');
    meta.className = 'dialog-meta';
    [
        `⭐ ${recipe.rating}`,
        `⏱️ ${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min`,
        recipe.difficulty
    ].forEach(function (value) {
        const item = document.createElement('span');
        item.textContent = value;
        meta.appendChild(item);
    });

    body.append(cuisine, title, meta);

    if (recipe.ingredients && recipe.ingredients.length) {
        const heading = document.createElement('h3');
        heading.textContent = 'Ingredients';

        const ingredients = document.createElement('ul');
        ingredients.className = 'ingredients';
        recipe.ingredients.forEach(function (ingredient) {
            const item = document.createElement('li');
            item.textContent = ingredient;
            ingredients.appendChild(item);
        });

        body.append(heading, ingredients);
    }

    if (recipe.instructions && recipe.instructions.length) {
        const heading = document.createElement('h3');
        heading.textContent = 'Instructions';

        const instructions = document.createElement('div');
        instructions.className = 'instructions';
        recipe.instructions.forEach(function (instruction, index) {
            const step = document.createElement('p');
            step.textContent = `${index + 1}. ${instruction}`;
            instructions.appendChild(step);
        });

        body.append(heading, instructions);
    }

    $dialogContent.replaceChildren(image, body);
    $recipeDialog.showModal();
}

// ==============================
// RENDER FILTER OPTIONS
// ==============================

function renderCuisineOptions() {
    const cuisines = [...new Set(
        recipes.map(function (recipe) {
            return recipe.cuisine;
        }).filter(Boolean)
    )].sort();

    cuisines.forEach(function (cuisine) {
        const option = document.createElement('option');

        option.value = cuisine;
        option.textContent = cuisine;

        $cuisineFilter.appendChild(option);
    });

    const existingDifficulties = new Set(
        [...$difficultyFilter.options].map(function (option) {
            return option.value;
        })
    );

    [...new Set(
        recipes.map(function (recipe) {
            return recipe.difficulty;
        }).filter(Boolean)
    )].sort().forEach(function (difficulty) {
        if (!existingDifficulties.has(difficulty)) {
            const option = document.createElement('option');

            option.value = difficulty;
            option.textContent = difficulty;

            $difficultyFilter.appendChild(option);
        }
    });

    $cuisineFilter.value = filters.cuisine;

    if ($cuisineFilter.value !== filters.cuisine) {
        filters.cuisine = '';
    }

    $difficultyFilter.value = filters.difficulty;

    if ($difficultyFilter.value !== filters.difficulty) {
        filters.difficulty = '';
    }
}

// ==============================
// FILTER RECIPES
// ==============================

function getFilteredRecipes() {
    const searchTerm = filters.search.trim().toLocaleLowerCase();

    return recipes.filter(function (recipe) {
        const searchableText = [
            recipe.name,
            recipe.cuisine,
            recipe.description,
            ...(recipe.ingredients || []),
            ...(recipe.tags || []),
            ...(recipe.mealType || [])
        ].join(' ').toLocaleLowerCase();

        return (
            (!searchTerm || searchableText.includes(searchTerm)) &&
            (!filters.cuisine || recipe.cuisine === filters.cuisine) &&
            (!filters.difficulty ||
                recipe.difficulty === filters.difficulty)
        );
    }).filter(function (recipe) {
        return !showingFavorites || favoriteIds.includes(recipe.id);
    });
}

// ==============================
// CREATE RECIPE CARD
// ==============================

function createRecipeCard(recipe) {
    const card = document.createElement('article');
    card.className = 'recipe-card';

    const image = document.createElement('img');
    image.className = 'recipe-image';
    image.src = recipe.image;
    image.alt = recipe.name;

    const body = document.createElement('div');
    body.className = 'recipe-body';

    const cuisine = document.createElement('span');
    cuisine.className = 'recipe-cuisine';
    cuisine.textContent = recipe.cuisine;

    const title = document.createElement('h3');
    title.className = 'recipe-title';
    title.textContent = recipe.name;

    const meta = document.createElement('div');
    meta.className = 'recipe-meta';

    const rating = document.createElement('span');
    rating.textContent = `⭐ ${recipe.rating}`;

    const duration = document.createElement('span');
    duration.textContent =
        `⏱️ ${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min`;

    const difficulty = document.createElement('span');
    difficulty.textContent = recipe.difficulty;

    const actions = document.createElement('div');
    actions.className = 'recipe-actions';

    const detailButton = document.createElement('button');
    detailButton.className = 'detail-button';
    detailButton.type = 'button';
    detailButton.textContent = 'View Detail';
    detailButton.addEventListener('click', function () {
        showRecipeDetail(recipe.id);
    });

    const likeButton = document.createElement('button');
    const isFavorite = favoriteIds.includes(recipe.id);
    likeButton.className = 'like-button';
    likeButton.type = 'button';
    likeButton.textContent = isFavorite ? '♥' : '♡';
    likeButton.title = isFavorite ? 'Remove from favorites' : 'Favorite';
    likeButton.setAttribute('aria-label', likeButton.title);
    likeButton.setAttribute('aria-pressed', String(isFavorite));
    likeButton.addEventListener('click', function () {
        toggleFavorite(recipe.id);
    });

    actions.append(detailButton, likeButton);
    meta.append(rating, duration, difficulty);
    body.append(cuisine, title, meta, actions);
    card.append(image, body);

    return card;
}

// ==============================
// RENDER RECIPES
// ==============================

function renderRecipes() {
    const filteredRecipes = getFilteredRecipes();
    const fragment = document.createDocumentFragment();

    filteredRecipes.forEach(function (recipe) {
        fragment.appendChild(createRecipeCard(recipe));
    });

    $recipeGrid.replaceChildren(fragment);

    $recipeGrid.hidden = filteredRecipes.length === 0;
    $emptyState.hidden = filteredRecipes.length !== 0;

    $sectionTitle.textContent = showingFavorites
        ? 'Favorite Recipes'
        : 'Explore Recipes';
    $emptyTitle.textContent = showingFavorites
        ? '❤️ No favorite recipes yet'
        : '🔍 Recipe not found';
    $emptyDescription.textContent = showingFavorites
        ? 'Tap the heart on a recipe card to save it here.'
        : 'Try another keyword or filter.';

    $recipeCount.textContent =
        `${filteredRecipes.length} ${
            filteredRecipes.length === 1 ? 'recipe' : 'recipes'
        }`;

    $resetFilterButton.hidden =
        !filters.search && !filters.cuisine && !filters.difficulty;
}

// ==============================
// GET RECIPES API
// ==============================

async function getRecipesAPI() {
    const response = await fetch(
        'https://dummyjson.com/recipes?limit=0'
    );

    if (!response.ok) {
        throw new Error(
            `Recipe request failed with status ${response.status}`
        );
    }

    const data = await response.json();

    return data.recipes;
}

// ==============================
// MAIN FUNCTION
// ==============================

async function main() {
    try {
        recipes = await getRecipesAPI();

        renderCuisineOptions();

        $loadingState.hidden = true;

        renderRecipes();
    } catch (error) {
        console.error('Could not load recipes:', error);

        $loadingState.hidden = true;
        $errorState.hidden = false;
    }
}

// ==============================
// EVENT LISTENERS
// ==============================

// Search button
$searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    filters.search = $searchInput.value.trim();

    saveFilters();
    renderRecipes();

    // Memanggil efek yang berada di bagian paling bawah
    showJumpscare();

    console.log('Recipe search:', filters);
});

// Cuisine filter
$cuisineFilter.addEventListener('change', function () {
    filters.cuisine = $cuisineFilter.value;

    saveFilters();
    renderRecipes();
});

// Difficulty filter
$difficultyFilter.addEventListener('change', function () {
    filters.difficulty = $difficultyFilter.value;

    saveFilters();
    renderRecipes();
});

// Reset filter button
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

$favoriteButton.addEventListener('click', function () {
    showingFavorites = !showingFavorites;
    updateFavoriteButton();
    renderRecipes();
});

$closeDialog.addEventListener('click', function () {
    $recipeDialog.close();
});

$recipeDialog.addEventListener('click', function (event) {
    if (event.target === $recipeDialog) {
        $recipeDialog.close();
    }
});

updateFavoriteButton();

// Jalankan aplikasi
main();

// ==================================================
// SEARCH BUTTON EFFECT: IMAGE + AUDIO
// Semua kode efek dipisahkan di bagian paling bawah.
// ==================================================

const jumpscareAudio = new Audio('audio/audio.mp3');

const JUMPSCARE_IMAGE_URL = 'image/download.jpg';

let jumpscareTimeout;

function showJumpscare() {
    const previousOverlay = document.getElementById('jumpscare-overlay');

    if (previousOverlay) {
        previousOverlay.remove();
    }

    window.clearTimeout(jumpscareTimeout);

    const image = document.createElement('img');

    image.id = 'jumpscare-overlay';
    image.src = JUMPSCARE_IMAGE_URL;
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');

    image.style.position = 'fixed';
    image.style.inset = '0';
    image.style.width = '100vw';
    image.style.height = '100vh';
    image.style.objectFit = 'cover';
    image.style.zIndex = '999999';
    image.style.pointerEvents = 'none';

    document.body.appendChild(image);

    jumpscareAudio.currentTime = 0;

    jumpscareAudio.play().catch(function (error) {
        console.error('Could not play jumpscare audio:', error);
    });

    jumpscareTimeout = window.setTimeout(function () {
        image.remove();
    }, 1000);
}