import firebase from "firebase/app";
import "firebase/firestore";
import {store} from "./stores";
// import * as admin from 'firebase-admin';

// import authentication from "./stores/authentication"

const firebaseConfig = {
  apiKey: "AIzaSyAfvaitXPRffCORs2xS2Km_bB8aJta1ML8",
  authDomain: "my-store-46d7f.firebaseapp.com",
  projectId: "my-store-46d7f",
  storageBucket: "my-store-46d7f.appspot.com",
  databaseURL: "https://my-store-46d7f-default-rtdb.firebaseio.com/",
  messagingSenderId: "905723884752",
  appId: "1:905723884752:web:572a0ff9828b7be9cd1ad5",
  measurementId: "G-4R2BGE8S20",
};

// export const app = admin.initializeApp();

// Get a Firestore instance
export const db = firebase.initializeApp(firebaseConfig).firestore();

// Export types that exists in Firestore
const {TimeStamp, GeoPoint} = firebase.firestore;
export {TimeStamp, GeoPoint};

// if using Firebase JS SDK < 5.8.0
db.settings({timestampsInSnapshots: true});

//Get user logged in
const getUser = store.getters.getUser;
const isLoggedIn = store.getters.isLoggedIn;
const getProducts = store.getters.productsInCart;
const getOrders = store.getters.getOrders;
// const prodProd = store.getters.allProducts;

//Products operations in DB
//Adding to Cart collection
export const addToCartDB = async () => {
  if (isLoggedIn == true) {
    // console.log("start checking in DB");
    let cartUserRef = db.collection("carts").doc(getUser.email);
    let doc = await cartUserRef.get();
    let products = null;

    if (doc.exists) {
      // If user cart exists
      try {
        // console.log("saving to user cart");
        products = {Products: getProducts};

        cartUserRef.set(products);
      } catch (e) {
        console.log(e);
      }
    } else {
      // console.log("create user cart");
      products = {items: getProducts};
      cartUserRef.set(products);
    }
  }
};

//Update orders in DB
export const updateOrders = async () => {
  if (isLoggedIn == true) {
    // console.log("start checking in DB");
    let ordersCollection = await db.collection("orders").doc(getUser.email);
    let doc = await ordersCollection.get();
    let orders = null;

    if (doc.exists) {
      // If user exists
      try {
        // console.log("saving to user orders");
        orders = {Orders: getOrders};

        ordersCollection.set(orders);
      } catch (e) {
        console.log(e);
      }
    } else {
      // console.log("create user orders");
      orders = {items: getOrders};
      ordersCollection.set(orders);
    }
  }
};

//Update in DB changes made in the cart
export const updateStoreFromDB = async () => {
  let cartUserRef = await db.collection("carts").doc(getUser.email);
  let doc = await cartUserRef.get();

  if (doc.exists) {
    try {
      let products = doc.data().Products;

      if (products.length > 0) {
        store.commit("cartProductsList", products);
        // let pro = store.getters.productsInCart;
        // console.log(pro);
      } else if (products.length == 0 && getProducts.length != 0) {
        let productInCart = {Products: getProducts};
        cartUserRef.set(productInCart);
      }
    } catch (e) {
      console.log(e);
    }
  }
};

//Removing from Cart collection
export const removeFromCartDB = async () => {
  if (isLoggedIn == true) {
    // console.log("start checking in DB");
    let cartUserRef = db.collection("carts").doc(getUser.email);
    let doc = await cartUserRef.get();

    try {
      if (doc.exists) {
        // Update products in user cart
        // console.log("Update user cart");
        let products = {Products: getProducts};

        cartUserRef.set(products);
      }
    } catch (e) {
      console.log(e);
    }
  }
};
