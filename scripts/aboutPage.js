
import { initializeCommonElements,updateCartQuantity } from "./sharedCode.js";
let cartQuantity = document.querySelector('.js-cart-quantity')

document.addEventListener('DOMContentLoaded', async function () {

   let mainHTML = document.querySelector(".about-main");
    
    let aboutHTML = `<div class="about-title">About the Project</div><div class="about-container">This project was developed by myself(Michael McGallagly). I decided to create a fantasy shop as i felt as if it would demonstrate my skills quite well. This project implements firebase to read in all the products information and images displayed on the website. This was my first time using firebase and i thouroughly enjoyed using it. You cannot buy anything from the shop but maybe i will make that happen in the future. So I hope you enjoy the website and i will be developing more projects in the future. GOODBYE! </div>`

    mainHTML.innerHTML = aboutHTML;

initializeCommonElements();

});
updateCartQuantity(cartQuantity);