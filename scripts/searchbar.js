import { products } from "./product.js";
import {setupProductClickListeners} from "./sharedCode.js";

/*const searchInput = document.querySelector('.search-bar');


searchInput.addEventListener('input', function(e){

    let value = e.target.value;

    if(value && value.trim().length >0){
        value = value.trim().toLowerCase();

        setList(products.filter(products => {
            return products.name.toLowerCase().includes(value);
        }));
    }
    else{
    }
});

export function setList(results){
    for(const name of results){

        const resultItem = document.createElement('li');

        resultItem.classList.add('result-item');

        const text = document.createTextNode(products.name)

        resultItem.appendChild(text);

        list.appendChild(resultItem);
    }

}*/

/*const searchBar = document.querySelector('.search-id');
const searchResults = document.getElementById('search-results');

export function searchbartool(){

    searchResults.innerHTML = '';
    const searchTerm = searchBar.value.toLowerCase();

    const filteredProducts = products.filter(product => {
        const productName = product.name.toLowerCase();
        return productName.includes(searchTerm);
    });

    filteredProducts.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.textContent = product.name;
        searchResults.appendChild(resultItem);
    });


};*/

export function handleSearch(searchBar, searchResults, products) {
    
   
    const searchTerm = searchBar.value.toLowerCase();
    searchResults.innerHTML = '';

    if (searchTerm.trim() !== '') {
    const filteredProducts = products.filter(product => {
        const productName = product.name.toLowerCase();
        
        return productName.includes(searchTerm);
    });
    if (filteredProducts.length > 0) {
    filteredProducts.forEach(product => {
        

       
        const resultItem = document.createElement('div');
        resultItem.innerHTML = product.name;
        searchResults.appendChild(resultItem);
        
        resultItem.addEventListener('click', function () {
            localStorage.setItem('selectedProduct', product.name);
            window.location.href = 'product-page.html';
        });
        
    });
    searchResults.style.display = 'block';
} else {
    searchResults.style.display = 'none';

} 
}else {
    searchResults.style.display = 'none';
}
    

};

export function ButtonSearch(searchBar, products,) {


    const searchTerm = searchBar.value.toLowerCase();

    const matchingProduct = products.filter(product=> product.name.toLowerCase().includes(searchTerm));

        displayMatchingProduct(matchingProduct);
    
}

// Function to check if the current page is product-page.html
function isProductPage() {
    return window.location.pathname.includes('product-page.html');
}

function displayMatchingProduct(matchingProduct){

    
    const gettingStuff = matchingProduct;


    console.log(gettingStuff);

    let productsHTML = ''; //this will add the html to the page



gettingStuff.forEach((product) => {
    if(product.keywords == "shoes"){
    productsHTML += `
        <div class="product-container">

           <div class="product-image-container js-image-container" data-product-name="${product.name}">
                <img src="${product.image}" class="product-image">
            </div>

            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price"> $${(product.priceCents / 100).toFixed(2)}</div>
            </div>

            <div class="choose-size">
                <select name="sizes" class="size-choice">
                    <optgroup label="Size">
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                </select>
            </div>

            <div class="add-to-cart">
                 <button class="cart-add">Add to Cart</button>
            </div>


        </div>
    
    `}
    
    else if (product.keywords == "top"){

    productsHTML += 
    ` <div class="product-container">

           <div class="product-image-container js-image-container" data-product-name="${product.name}">
                <img src="${product.image}" class="product-image">
            </div>

            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price"> $${(product.priceCents / 100).toFixed(2)}</div>
            </div>

            <div class="choose-size">
                <select name="sizes" class="size-choice">
                    <optgroup label="Size">
                        <option value="xs">XS</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="xl">XL</option>
                </select>
            </div>

            <div class="add-to-cart">
                 <button class="cart-add">Add to Cart</button>
            </div>


        </div>`

    };

});
/*
let isProductPageBoolean = isProductPage();
console.log(isProductPageBoolean);

if(isProductPageBoolean) {

    document.querySelector('.fullpage').innerHTML = ``;

   document.querySelector('.fullpage').innerHTML = `<div class = "search-heading">items relating to your search...</div>`;

document.querySelector('.fullpage').innerHTML += productsHTML;

//let ChangeGridSize = document.querySelector('.product-container');
//let ChangeMainSize = document.querySelector('main-products');

setupProductClickListeners();

let productContainers = document.querySelectorAll('.product-container');

    // Loop through each product container and set width to 100%
    productContainers.forEach(function (container) {
        container.style.width = '100%';
    });

    // Optionally, if you want to remove the fixed grid-template-columns
    let mainProducts = document.querySelector('.main-products');
    if (mainProducts) {
        mainProducts.style.gridTemplateColumns = 'unset';
    }

    let productsGrid = document.querySelector('.products-grid');
    if (productsGrid) {
        productsGrid.style.gridTemplateColumns = 'unset';
    }

//ChangeGridSize.removeAttribute('style');

//ChangeGridSize.style.gridTemplateColumns = '1fr';

*/



document.querySelector('.js-products-grid').innerHTML = `<div class = "search-heading">items relating to your search...</div>`;

document.querySelector('.js-products-grid').innerHTML += productsHTML;

let ChangeGridSize = document.querySelector('.js-products-grid');

setupProductClickListeners();

ChangeGridSize.style.gridTemplateColumns = '1fr';


}

