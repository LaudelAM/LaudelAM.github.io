var admin = require("firebase-admin");
// var serviceAccount = require("./serviceAccount.json");
var serviceAccount = require("./src/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-store-46d7f-default-rtdb.firebaseio.com",
});

const data = require("./src/json/products.json");

data &&
  Object.keys(data).forEach((key) => {
    const nestedContent = data[key];

    if (typeof nestedContent === "object") {
      Object.keys(nestedContent).forEach((docTitle) => {
        admin
          .firestore()
          .collection(key)
          .doc(docTitle)
          .set(nestedContent[docTitle])
          .then((res) => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      });
    }
  });
