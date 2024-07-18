import { products, dataLoaded  } from "./product.js";

import { generateNav, generateSizeHTML, generateProductHTML, setupProductClickListeners, ButtonSearcherClick, updateCartQuantity, addToCartButton, initializeCommonElements } from "./sharedCode.js";

let cartQuantity = document.querySelector('.js-cart-quantity')


// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', async function () {

    await dataLoaded;

    


    const productsGrid = document.querySelector('.js-products-grid');

    if (productsGrid) {
        productsGrid.innerHTML = '';
        let productsHTML = '';
    


  products.forEach((product) => {
   let sizeOptionsHTML =  generateSizeHTML(product);

    productsHTML += generateProductHTML(product, sizeOptionsHTML);
  
    
  }); //this creates the html which needs to be added to the page
  
  productsGrid.innerHTML = productsHTML; //this adds the html to the class 
  
  

    const selectedProduct = localStorage.getItem('selectedProduct');
    if (selectedProduct) {
        localStorage.removeItem('selectedProduct'); // Clear local storage
    }
    setupProductClickListeners();
   



    document.querySelectorAll('.cart-add').forEach((button) =>{
        button.addEventListener('click', () => {
            
                addToCartButton(button,cartQuantity);
    
        })
        });

        initializeCommonElements();


}}); //end of dom loading function 

updateCartQuantity(cartQuantity);


