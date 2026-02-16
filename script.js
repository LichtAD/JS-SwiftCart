// category data
const loadCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((json) => {
            // console.log(json);
            displayCategories(json);
        })
}

loadCategories();

const displayCategories = (categories) => {

    const CategoriesContainer = document.getElementById("category_container");

    CategoriesContainer.innerHTML = `<button class="btn btn-primary btn-outline rounded-full btn-active">All</button>`;  // default all category

    for (let category of categories) {
        // console.log(category);

        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button class="btn btn-primary btn-outline rounded-full">${category}</button>
        `;

        CategoriesContainer.appendChild(btnDiv);
    }
}

// show all products by default
const loadAllProducts = () => {
    fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => {
            // console.log(json);
            displayAllProducts(json);
        })
}

loadAllProducts();

const displayAllProducts = (products) => {

    const productsContainer = document.getElementById("products_container");
}