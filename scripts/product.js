import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref as databaseRef, onValue, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC869snB2eKVz04nfE9Io4UR6jsHSPDXHw",
  authDomain: "michaelshop-f6bfd.firebaseapp.com",
  databaseURL: "https://michaelshop-f6bfd-default-rtdb.firebaseio.com",
  projectId: "michaelshop-f6bfd",
  storageBucket: "michaelshop-f6bfd.appspot.com",
  messagingSenderId: "372085476490",
  appId: "1:372085476490:web:7dbdd224abf6203c45f173",
  measurementId: "G-0HBRGCRMEE"
};

const appSettings = {
  databaseURL: "https://michaelshop-f6bfd-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const productsRef = databaseRef(database, "products");

const storage = getStorage(app);

export let products = [];
const fetchData = new Promise((resolve, reject) => {
  onValue(productsRef, async (snapshot) => {
    const data = snapshot.val();

    if (data) {
      const promises = Object.keys(data).map(async (productId) => {
        const productData = data[productId];

        const imagePath = productData.image.startsWith('./') ? productData.image.substring(2) : productData.image;
        const imageRef = storageRef(storage, imagePath);

        try {
          const imageUrl = await getDownloadURL(imageRef);

          const product = {
            image: imageUrl,
            name: productData.name,
            priceCents: productData.priceCents,
            description: productData.description,
            keywords: productData.keywords || []
          };

          products.push(product);
        } catch (error) {
          console.error(`Error getting download URL for ${imagePath}:`, error);
          reject(error); // Reject the Promise in case of an error
        }
      });

      // Wait for all asynchronous operations to complete
      await Promise.all(promises);
      resolve(); // Resolve the Promise when everything is done
    } else {
      console.log("No data found");
      resolve(); // Resolve even if there's no data
    }
  });
});

// Export the fetchData Promise
export const dataLoaded = fetchData;

export function getProduct(productName) {
  return products.find((product) => product.name === productName);
}