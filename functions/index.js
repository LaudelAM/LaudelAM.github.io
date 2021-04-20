const functions = require("firebase-functions");
const admin = require("firebase-admin")
const algoliasearch = require("algoliasearch");

const ALGOLIA_APP_ID = "PH25ZBCTK3";
const ALGOLIA_ADMIN_KEY = "fbb5fbebfe01eed000c6c0c0ec23317d";
const ALGOLIA_INDEX_NAME = "products";

admin.initializeApp(functions.config().firebase)

exports.addFirestoreToAlgolia = functions.https.onRequest((req, res) => {
    let arr = []
    admin.firestore().collection("products").get().then((docs)=>{
        docs.forEach((doc)=>{
            let product = doc.data()
            product.objectID = doc.id

            arr.push(product)
        })
        const client = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
        const index = client.initIndex(ALGOLIA_INDEX_NAME);

        index.saveObjects(arr, function (err, content){
            res.status(200).send(content)
        })
    })
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
