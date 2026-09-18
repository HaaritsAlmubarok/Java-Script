console.log('=== MATERI 5 - CONSUME API ===');
const API_URL = 'https://dummyjson.com/products';

const productGrid = document.getElementById('product-grid');
const loadingState = document.getElementById('loading-state');
function renderProduct(dataProduct) {
    loadingState.hidden = true; // menghilangkan loading state
    productGrid.hidden = false; // menampilkan product grid
    productGrid.innerHTML = `
      <article class="product-card">
        <div class="product-image-wrap">
          <img class="product-image" src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp" alt="Essence Mascara Lash Princess" loading="lazy">
        </div>

        <div class="product-body">
          <span class="product-category">
            Beauty
          </span>

          <h3 class="product-title">
            Essence Mascara Lash Princess
          </h3>

          <div class="product-meta">
            <span class="product-price">
              $9.99
            </span>

            <span class="product-rating">
              ⭐ 2.56
            </span>
          </div>

          <button type="button" class="detail-btn" data-id="1">
            Lihat Detail
          </button>
        </div>
      </article>
    `;
}

// function di variable disebut juga arrow function atau anonymous function
const getProducts = async () => {
    try {
        const response = await fetch(API_URL); // mengambil response dari API
        const data = await response.json(); // data dijadikan object javascript
        // console.log(data);
        // destructuring assignment { key1, key2, ... }
        // untuk mengambil data berdasarkan key dari object data
        const { limit, products, skip, total } = data;
        console.log(products); // data dalam bentuk array objects
        // akses data indeks ke 0
        console.log(products[0].title);
        console.log(products[0].price);
        console.log(products[0].princess); // klo salah jadi undefined
        renderProduct(products[0]); // memanggil fungsi untuk merender produk ke halaman
        productGrid.hidden = false; // menghilangkan hidden dari productGrid
        loadingState.hidden = true; // menghilangkan hidden dari loadingState
    } catch (error) {
        alert('Something went wrong! Please try again later.');
        console.error("Error on getProducts:", error);
    }
};
// panggil fungsi untuk mengambil data dari API
getProducts();


    