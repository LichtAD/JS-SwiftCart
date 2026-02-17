// ! manage loader
const manageLoader = (isLoading) => {
    if (isLoading) {
        document.getElementById("loader").classList.remove("hidden");
        document.getElementById("products_container").classList.add("hidden");
    }
    else {
        document.getElementById("loader").classList.add("hidden");
        document.getElementById("products_container").classList.remove("hidden");
    }
}

// ! remove active class from all category btn
const removeActiveClassFromAllBtn = () => {
    const categoryBtn = document.querySelectorAll(".category_btn");
    categoryBtn.forEach((btn) => {
        btn.classList.remove("btn-active");
    });
}


// ! load category data
const loadCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((json) => {
            // console.log(json);
            displayCategories(json);
            loadAllProducts();
        })
}

loadCategories();

// ! display category data
const displayCategories = (categories) => {

    const CategoriesContainer = document.getElementById("category_container");

    CategoriesContainer.innerHTML = `<button onclick="loadAllProducts()" id="category_btn_id_all" class="btn btn-primary btn-outline rounded-full">All</button>`;  // default all category

    for (let category of categories) {
        // console.log(category);

        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button onclick="loadProductsByCategory(\`${category}\`)" id="category_btn_id_${category}" class="category_btn btn btn-primary btn-outline rounded-full">${category}</button>
        `;

        CategoriesContainer.appendChild(btnDiv);
    }
}

// ! load all products by default
const loadAllProducts = () => {
    removeActiveClassFromAllBtn();
    document.getElementById("category_btn_id_all").classList.add("btn-active");

    manageLoader(true);

    fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => {
            // console.log(json);
            displayProducts(json);
        })
}

// ! display products
const displayProducts = (products) => {

    const productsContainer = document.getElementById("products_container");
    productsContainer.innerHTML = "";

    products.forEach(product => {
        // console.log(product);

        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
            <div class="card bg-base-100 shadow-sm">
                <figure class="h-80">
                    <img src="${product.image}" class="bg-gray-200 object-contain w-full h-full" alt="" />
                </figure>
                <div class="card-body">
                    <div class="flex justify-between items-center">
                        <div class="badge bg-indigo-500/30 text-indigo-500 py-3 font-semibold">${product.category}</div>
                        <div class="flex justify-center items-center gap-1">
                            <div class="rating">
                                <div class="mask mask-star-2 bg-yellow-400" aria-current="true"></div>
                            </div>
                            <span class="text-sm">${product.rating.rate}</span>
                            <span class="text-sm">(${product.rating.count})</span>
                        </div>
                    </div>
                    <h2 class="card-title">
                        <span class="truncate text-ellipsis">
                            ${product.title}
                        </span>
                    </h2>
                    <p class="font-semibold text-2xl mb-2">$${product.price}</p>
                    <div class="flex justify-between items-center gap-3">
                        <button onclick="loadProductDetails_modal(${product.id})" class="btn btn-outline w-full flex-1 rounded-lg"><i class="fa-solid fa-eye"></i>
                            Details</button>
                        <button class="btn btn-primary w-full flex-1 rounded-lg"><i
                                class="fa-solid fa-cart-shopping"></i> Add</button>
                    </div>
                </div>
            </div>
        `;

        productsContainer.appendChild(productDiv);
    });

    manageLoader(false);
}


// ! load products by category
const loadProductsByCategory = (cat_name) => {
    // console.log(cat_name);

    manageLoader(true);

    const url = `https://fakestoreapi.com/products/category/${cat_name}`;
    // console.log(url);

    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            // console.log(json);
            displayProducts(json);

            removeActiveClassFromAllBtn();
            const allBtn = document.getElementById("category_btn_id_all");
            allBtn.classList.remove("btn-active");

            const clickBtn = document.getElementById(`category_btn_id_${cat_name}`);
            clickBtn.classList.add("btn-active");
        })
}

// ! load tranding products
const loadTrandingProducts = () => {
    fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => {
            // console.log(json);
            displayTrandingProducts(json);
        })
}

loadTrandingProducts();

// ! display tranding products
const displayTrandingProducts = (products) => {
    const trandingProductsContainer = document.getElementById("tranding_products_container");
    trandingProductsContainer.innerHTML = "";

    first_3_Products = products.slice(0, 3);

    first_3_Products.forEach(product => {
        // console.log(product);    

        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
            <div class="card bg-base-100 shadow-sm">    
                <figure class="h-80">    
                    <img src="${product.image}" class="bg-gray-200 object-contain w-full h-full" alt="" />    
                </figure>    
                <div class="card-body">    
                    <div class="flex justify-between items-center">    
                        <div class="badge bg-indigo-500/30 text-indigo-500 py-3 font-semibold">${product.category}</div>    
                        <div class="flex justify-center items-center gap-1">    
                            <div class="rating">    
                                <div class="mask mask-star-2 bg-yellow-400" aria-current="true"></div>                        
                            </div>    
                            <span class="text-sm">${product.rating.rate}</span>    
                            <span class="text-sm">(${product.rating.count})</span>    
                        </div>    
                    </div>    
                    <h2 class="card-title">    
                        <span class="truncate text-ellipsis">    
                            ${product.title}    
                        </span>    
                    </h2>    
                    <p class="font-semibold text-2xl mb-2">$${product.price}</p>    
                    <div class="flex justify-between items-center gap-3">    
                        <button onclick="loadProductDetails_modal(${product.id})" class="btn btn-outline w-full flex-1 rounded-lg"><i class="fa-solid fa-eye"></i> Details</button>
                        <button class="btn btn-primary w-full flex-1 rounded-lg"><i class="fa-solid fa-cart-shopping"></i> Add</button>    
                    </div>    
                </div>    
            </div>    
        `;

        trandingProductsContainer.appendChild(productDiv);
    });
}


// ! load details modal
const loadProductDetails_modal = async (product_id) => {
    // console.log(product_id); 
    const url = `https://fakestoreapi.com/products/${product_id}`;
    const res = await fetch(url);
    const details = await res.json();
    // console.log(details);

    displayProductDetails_modal(details);
}

// ! display details modal
const displayProductDetails_modal = (product) => {
    const modalContainer = document.getElementById("modal_details_container");
    modalContainer.innerHTML = `
        <div class="flex flex-col justify-center items-start gap-3">
            
            <img src="${product.image}" class="bg-gray-200 object-contain w-full h-64" alt="" />

            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">${product.title}</h1>
            
            <div class="flex items-center gap-3">
                <span class="inline-flex items-center gap-1 text-yellow-500">
                    <i class="fa-solid fa-star"></i>
                    <span class="font-semibold">${product.rating.rate}</span>
                </span>
                <span class="text-sm text-gray-500">
                    (${product.rating.count} reviews)
                </span>
            </div>


            <span class="inline-block bg-indigo-50 text-indigo-600 text-sm font-medium px-3 py-1 rounded-full">
                ${product.category}
            </span>

            <p class="text-lg">${product.description}</p>
            
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <p class="text-2xl md:text-3xl font-bold text-indigo-600">
                    Price: $${product.price}
                </p>
            </div>
        </div>
    `;

    const modal = document.getElementById("category_modal");
    modal.showModal();
}