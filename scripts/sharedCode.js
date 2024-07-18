import{cart,addToCart} from "./cart.js";
import {handleSearch, ButtonSearch} from "./searchbar.js";
import { sidebarToggleClose, sidebarToggleOpen } from "./sidebar.js";
import { products,getProduct } from "./product.js";

export function setupProductClickListeners() {


    // Get all product image containers
    const productImageContainers = document.querySelectorAll('.js-image-container');

    const selectedProduct = localStorage.getItem('selectedProduct');
    if (selectedProduct) {
        localStorage.removeItem('selectedProduct'); // Clear local storage
    }
    // Add click event listener to each product image container
    productImageContainers.forEach((container) => {
        container.addEventListener('click', function () {
            // Get the product name from the dataset
            const productName = container.dataset.productName;

            // Store the product name in local storage
            localStorage.setItem('selectedProduct', productName);

            // Redirect to product-page.html
            window.location.href = 'product-page.html';
        });
    });

   
}



const searchBar = document.getElementById('search-id');

export function ButtonSearcherClick(){
    
    const searchTerm = searchBar.value; //retrieves the string from the search bar 

    localStorage.setItem('searchTerm', searchTerm); //stores item in local storage

    window.location.href = 'search-results.html'; //redirects to new page

}

export function updateCartQuantity(cartQuantity){ 
    let cartQuantityOf = 0;
  
    cart.forEach((cartItem) => {
    cartQuantityOf += cartItem.quantity;
   });
       
   cartQuantity.innerHTML = cartQuantityOf;
  }


  export function addToCartButton(button,cartQuantity) {
    let productContainer;

    if (button && button instanceof HTMLElement) {
        if (window.location.pathname === "/search-results.html") {
            productContainer = button.closest('.product-container-searchresult');
        } else if (window.location.pathname === "/product-page.html") {
            productContainer = button.closest('.main-products');
        } else {
            productContainer = button.closest('.product-container');
        }

        console.log("Product Container:", productContainer);

        if (productContainer) {
            const productName = button.dataset.productName;
            // get the selected size
            const sizeChoiceElement = productContainer.querySelector('.size-choice');

            if (sizeChoiceElement) {
                // store the selected size in local storage
                const selectedSize = sizeChoiceElement.value;
                addToCart(productName, selectedSize);
                // maybe add in updateCartQuantity()
                updateCartQuantity(cartQuantity);
                console.log(cart);
            } else {
                console.error("Size choice element not found");
            }
        } else {
            console.error("Product container not found");
        }
    } else {
        console.error("Invalid button element");
    }
}


  export function initializeCommonElements() {
    const searchBar = document.getElementById('search-id');
    const searchResults = document.getElementById('search-results');
    const ButtonSearcher = document.getElementById('search-button');
    const hamburger = document.querySelector('.hamburger-nav');
    let windowsize = window.matchMedia("(max-width: 800px)");
    const closeBtn = document.querySelector('.close-button');

    searchResults.style.display = 'none';

    searchBar.addEventListener('input', function (e) {
        handleSearch(searchBar, searchResults, products);
    });

    ButtonSearcher.addEventListener('click', function (e) {
        ButtonSearcherClick();
    });

    hamburger.addEventListener('click', function (e) {
        sidebarToggleOpen(windowsize);
    });

    closeBtn.addEventListener('click', function (e) {
        sidebarToggleClose();
    });

    
    

}

export function generateProductHTML(product, sizeOptions) {
    return `
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
                        ${sizeOptions}
                    </optgroup>
                </select>
            </div>
            <div class="add-to-cart">
                <button type="submit" class="cart-add" data-product-name="${product.name}">Add to Cart</button>
            </div>
        </div>`;
}

export function generateProductPageHTML(product, sizeOptions) {
    return `
        <div class="main-products"> 
            <div class="productpage-image-container">
                <img src="${product.image}" class="productpage-image">
            </div>
            <div class="productpage-info">
                <div class="prodcutpage-name-and-price">
                    <div class="productpage-name">${product.name}</div>
                    <div class="productpage-price">$${(product.priceCents / 100).toFixed(2)}</div>
                </div>
                <div class="productpage-choices">
                    <div class="productpage-choose-size">
                        <div class="choose-size">
                            <select name="sizes" class="size-choice">
                                <optgroup label="Size">
                                    ${sizeOptions}
                                </optgroup>
                            </select>
                        </div>
                    </div>
                    <div class="add-to-cart">
                        <button type="submit" class="cart-add" data-product-name="${product.name}">Add to Cart</button>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Description</button>
                        <div class="dropdown-content">
                            <p class="description">${product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

export function generateSizeHTML(product) {
    let sizeOptionsHTML = '';

    if (product.keywords == "shoes") {
        console.log("Shoes product detected");
        sizeOptionsHTML = `
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>`;
    } else if (product.keywords == "top") {
        console.log("Top product detected");
        sizeOptionsHTML = `
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>`;
    }

    console.log("Size options HTML:", sizeOptionsHTML);
    return sizeOptionsHTML;
}

export function generateProductSearchHTML(product, sizeOptions) {
    return `
        <div class="product-container-searchresult">
            <div class="product-image-container js-image-container" data-product-name="${product.name}">
                <img src="${product.image}" class="product-image">
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
            </div>
            <div class="choose-size">
                <select name="sizes" class="size-choice">
                    <optgroup label="Size">
                        ${sizeOptions}
                    </optgroup>
                </select>
            </div>
            <div class="add-to-cart">
                <button type="submit" class="cart-add" data-product-name="${product.name}">Add to Cart</button>
            </div>
        </div>`;
}

export function generateNav(){
const stickyNavbar = document.createElement('div');
stickyNavbar.className = 'sticky_navbar';

const navbarLeft = document.createElement('div');
navbarLeft.className = 'navbar-left';
navbarLeft.innerHTML = `
    <img src="images/hamburger.jpg" class="hamburger-nav">
    <a href="index.html"><img src="images/Logo.png" class="logo-nav"></a>
`;

const navbarCenter = document.createElement('div');
navbarCenter.className = 'navbar-center';
navbarCenter.innerHTML = `
    <input class="search-bar" type="text" placeholder="Search" id="search-id">
    <button id="search-button">
        <img src="images/search.svg" class="search-icon">
    </button>
    <div id="search-results"></div>
`;

const navbarRight = document.createElement('div');
navbarRight.className = 'navbar-right';
navbarRight.innerHTML = `
    <div class="cart">
        <a href="checkout-page.html"><img class="cart-icon" src="images/cart-icon.png"></a>
        <div class="cart-quantity js-cart-quantity"></div>
    </div>
`;

const sidebarContainer = document.createElement('div');
sidebarContainer.className = 'sidebar-container';

const sidebar = document.createElement('div');
sidebar.className = 'sidebar';
sidebar.innerHTML = `
    <a><div class="close-button">x</div></a>
    <a href="About.html"> About</a>
    <a> Contact</a>
    <a href="index.html"> Shop</a>
    <a href="SignUp.html">SignUp</a>
`;

// Append elements to the DOM
stickyNavbar.appendChild(navbarLeft);
stickyNavbar.appendChild(navbarCenter);
stickyNavbar.appendChild(navbarRight);

sidebarContainer.appendChild(sidebar);

// Get the body element and append stickyNavbar and sidebarContainer
const body = document.body;
body.appendChild(stickyNavbar);
body.appendChild(sidebarContainer);
}