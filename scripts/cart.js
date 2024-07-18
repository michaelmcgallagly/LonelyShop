
export let cart = JSON.parse(localStorage.getItem('cart')) ; //takes the name specified in the localStorage.setItem function below to add the array to the item 


if(!cart){
    cart = []}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart)); //cart used here gives a name to the info we are saving in local storage
    console.log(cart);
}

export function addToCart(productName,selectedSize) {
    let matchingItemIndex = -1;

    // Find the index of the matching item in the cart
    for (let i = 0; i < cart.length; i++) {
        if (productName === cart[i].productName && selectedSize === cart[i].size) {
            matchingItemIndex = i;
            break;
        }
    }

    if (matchingItemIndex !== -1) {
        // If matching item exists, update its quantity
        cart[matchingItemIndex].quantity += 1;
    } else {
        // If matching item doesn't exist, add a new item to the cart
        cart.push({
            productName: productName,
            quantity: 1,
            size: selectedSize
        });
    }

    saveToStorage();
}

export function removeFromCart(productName,size){

    const newCart = [];
    cart.forEach((cartItem) =>{
      
        if (cartItem.productName == productName && cartItem.size == size){
            console.log("Removed");
        }
        else{
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();

  };
/*
  export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    
          cart.forEach((cartItem) => {
              if(productId === cartItem.productName){
                  matchingItem = cartItem;
              }
          });
    
    matchingItem.deliveryOptionId = deliveryOptionId;
    
    saveToStorage();
  }*/