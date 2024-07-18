import {cart, removeFromCart} from './cart.js'; //this is a named export 
import {products, getProduct, dataLoaded} from './product.js';
import {handleSearch, ButtonSearch} from "./searchbar.js";
import { sidebarToggleClose, sidebarToggleOpen } from "./sidebar.js";
import {generateNav, setupProductClickListeners,ButtonSearcherClick,updateCartQuantity,addToCartButton,initializeCommonElements } from "./sharedCode.js";

let cartQuantity = document.querySelector('.js-cart-quantity')

 
document.addEventListener('DOMContentLoaded', async function () {
  await dataLoaded;

  //generateNav();
  let searchResultsItem = document.getElementById('search-results');
     searchResultsItem.style.display = 'none';

  let cartSummaryHTML = '';
  let paymentSummaryHTML = '';
  let checkoutSummaryHTML = '';

  let totalCheckout = 0;


  if(cart.length == 0){
    cartSummaryHTML += `<div class="page-title">Nothing added to cart</div>`
    const paymentSummary = document.querySelector('.payment-summary');

    paymentSummary.style.display = 'none';

  }
  else{

  cart.forEach((cartItem) => {
      const productId = cartItem.productName
      const productSize = cartItem.size;
       //this gets the product name from every item in the cart 

      const matchingProduct = getProduct(productId);

      cartSummaryHTML += 
      `<div class="cart-item-container
       js-cart-item-container-${matchingProduct.name}-${productSize}">
       

       <div class="cart-item-details-grid">
            <div class="cart-img-container">
                <img class="product-image"
                  src="${matchingProduct.image}">
                </div>
                <div class="cart-item-details">
                  <div class="product-name">
                  ${matchingProduct.name}               
                  </div>
                  <div class="product-price">
                    $${(matchingProduct.priceCents/100).toFixed(2)}
                  </div>
                  <div class="product-size">
                  Size: ${productSize}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="delete-link link-primary js-delete-link" data-product-name="${matchingProduct.name}" data-product-size="${productSize}">
                    • Delete Items?
                    </span>
                  </div>
                </div>
                </div>
                </div>
       `;
  

       let totalForProduct = ((matchingProduct.priceCents/100) * cartItem.quantity).toFixed(2);
       paymentSummaryHTML+=`
                            <div class="checkout-product js-checkout-item-${productId}-${productSize}">
                           <div class="checkout-product-name"> ${matchingProduct.name} </div>
                           <div class="checkout-product-size"> Size:  ${cartItem.size} </div>
                           <div class= "checkout-product-quantity">Quantity: ${cartItem.quantity}</div>
                            </div>
                            <div class="total-product-price js-checkout-total-${productId}">
                            $${totalForProduct}
                            </div>
       
       
                 `
                 totalCheckout += parseFloat(totalForProduct);
                 
  

  });
}
totalCheckout = totalCheckout.toFixed(2);

function generateTotal(){
 return checkoutSummaryHTML+=`
  <div class="checkout-total">Total: $${totalCheckout}</div>
  <div class="checkout-button-div">
      <button type="submit" class="checkout-button">Checkout</button>
</div>
  `
}

let checkoutSummaryTotalHTML = generateTotal();

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  document.querySelector('.payment-checkout').innerHTML = paymentSummaryHTML;
  document.querySelector('.Total').innerHTML = checkoutSummaryHTML;

  document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
      link.addEventListener('click', () => {
      const productId = link.dataset.productName;
      const size = link.dataset.productSize;

      console.log('Clicked delete link. ProductId:', productId, 'Size:', size);

      
      


      const container = document.querySelector(`.js-cart-item-container-${productId}-${size}`);
      const checkoutContainer = document.querySelector(`.js-checkout-item-${productId}-${size}`);
      const totalContainer = document.querySelector(`.js-checkout-total-${productId}`);  

      removeFromCart(productId,size); 
      updateCartQuantity(cartQuantity);   

  
    
        
        container.remove();
        checkoutContainer.remove();
        totalContainer.remove();
     

    if(cart.length == 0){
      const fullContainer = document.querySelector(`.js-payment-summary`);  
      fullContainer.remove();
      cartSummaryHTML = `<div class="page-title">Nothing added to cart</div>`
      document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    }
    this.location.reload()
;
  })
  });
 
  initializeCommonElements();

  const checkoutBtn = document.querySelector(".checkout-button")

  checkoutBtn.addEventListener('click', function () {
    // Trigger an alert when the element is clicked
    alert('Unfortunately this is as far as the site goes... maybe we will sell real items in the future....');
  });

});


updateCartQuantity(cartQuantity);

