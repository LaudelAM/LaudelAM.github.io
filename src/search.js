const functions = require("firebase-functions");
const firebaseAdmin = require("firebase-admin");
const algoliaSearch = require("algoliasearch");
const ALGOLIA_APP_ID = functions.config().algolia.application_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.admin_api_key;
const ALGOLIA_INDEX_NAME = functions.config().algolia
  .search_only_api_key;
const algoliaClient = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const algoliaIndex = algoliaClient.initIndex("dev_accommodation");
