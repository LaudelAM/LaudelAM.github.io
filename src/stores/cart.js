import {db} from "../database";
import firebase from "firebase/app";

export default {
  state: () => ({
    products: [],
  }),

  getters: {
    productsInCart(state) {
      return state.products;
    },

    subtotalCalculation(state) {
      let subtotal = state.products.reduce(
        (accumulator, current) =>
          accumulator + current.price * current.quantity,
        0
      );
      return subtotal;
    },
  },

  mutations: {
    async addToCart(state, product) {
      console.log("start checking in store");
      let findProduct = state.products.find((data) => data.id === product.id);

      if (!findProduct) {
        product.quantity = 1;
        state.products.push(product);
      } else {
        findProduct.quantity += 1;
      }
      console.log("end checking in store");

      console.log("start checking in DB");
      let cartProductRef = db.collection("cart").doc(product.id);
      let doc = await cartProductRef.get();
      let productInCart = doc.data();

      console.log("end checking in DB", productInCart);

      if (doc.exists && productInCart.quantity >= 1) {
        // Atomically increment the quantity of the city by 1.
        try {
          cartProductRef.update({
            quantity: firebase.firestore.FieldValue.increment(1),
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        let productRe = db.collection("products").doc(product.id);
        let doc = await productRe.get();
        let productData = doc.data();
        //Saving product to firestore database
        console.log("Start saving to Cart", productData);

        await cartProductRef.set({
          image: product.image,
          title: product.title,
          category: product.category,
          price: product.price,
          quantity: (product.quantity = 1),
        });
        console.log("end saving to cart");
      }
    },

    async removeFromCart(state, product) {
      console.log("start checking in store");
      let findProduct = state.products.find(
        (data) => data.title === product.title
      );

      if (findProduct && findProduct.quantity > 1) {
        findProduct.quantity = findProduct.quantity - 1;
      } else if (findProduct.quantity == 1) {
        state.products.splice(state.products.indexOf(findProduct), 1);
      }

      console.log("start checking in DB");
      let cartProductRef = db.collection("cart").doc(product.id);
      let doc = await cartProductRef.get();
      let productInCart = doc.data();

      if (doc.exists && productInCart.quantity > 1) {
        // Atomically decrement the quantity of the product by 1.
        try {
          cartProductRef.update({
            quantity: firebase.firestore.FieldValue.increment(-1),
          });

          console.log("updated qty");
        } catch (e) {
          console.log(e);
        }
      } else if (productInCart.quantity == 1) {
        db.collection("cart")
          .doc(product.id)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
