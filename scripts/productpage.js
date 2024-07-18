import { getProduct, dataLoaded } from "./product.js";
//import { getItem } from "./index.js";

import {generateSizeHTML, generateProductPageHTML, setupProductClickListeners,ButtonSearcherClick,updateCartQuantity,addToCartButton,initializeCommonElements } from "./sharedCode.js";

let productHTML = ``;

let cartQuantity = document.querySelector('.js-cart-quantity')


document.addEventListener('DOMContentLoaded', async function () {
    await dataLoaded;

    // Retrieve the selected product name from local storage
    const selectedProduct = localStorage.getItem('selectedProduct');
    // Display the product information on the page
    if (selectedProduct) {
        const product = getProduct(selectedProduct);

        if (product) {
            let sizeOptionsHTML =  generateSizeHTML(product);
    
            productHTML = generateProductPageHTML(product, sizeOptionsHTML);
            document.querySelector('.fullpage').innerHTML = productHTML;        }
    }

    document.querySelectorAll('.cart-add').forEach((button) =>{
        button.addEventListener('click', () => {

            addToCartButton(button,cartQuantity);
        })
        });

        initializeCommonElements()
    
});
updateCartQuantity(cartQuantity);

