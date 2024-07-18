import { products,dataLoaded } from "./product.js";
//import { getItem } from "./index.js";
import {generateSizeHTML,generateProductSearchHTML, setupProductClickListeners,updateCartQuantity,addToCartButton,initializeCommonElements } from "./sharedCode.js";
let productHTML = ``;

let cartQuantity = document.querySelector('.js-cart-quantity')


document.addEventListener('DOMContentLoaded', async function () {
    await dataLoaded;


    let searchTerm = localStorage.getItem('searchTerm');
     console.log(searchTerm);

     let searchResultsItem = document.getElementById('search-results');
     searchResultsItem.style.display = 'none';

     const matchingProduct = products.filter(product=> product.name.toLowerCase().includes(searchTerm));

        displayMatchingProduct(matchingProduct);


        function displayMatchingProduct(matchingProduct){

    
            const gettingStuff = matchingProduct;
        
        
            console.log(gettingStuff);
        
            let productsHTML = ''; //this will add the html to the page
        
        
        
        gettingStuff.forEach((product) => {
            let sizeOptionsHTML =  generateSizeHTML(product);
    
            productHTML += generateProductSearchHTML(product, sizeOptionsHTML);
        
        });



        document.querySelector('.js-products-grid-results').innerHTML = `<div class = "search-heading">items relating to your search...</div>`;

document.querySelector('.js-products-grid-results').innerHTML += productHTML;

let ChangeGridSize = document.querySelector('.js-products-grid-results');

setupProductClickListeners();

document.querySelectorAll('.cart-add').forEach((button) =>{
    button.addEventListener('click', () => {
        
            addToCartButton(button,cartQuantity);

    })
    });
initializeCommonElements();


    }
});
updateCartQuantity(cartQuantity);

