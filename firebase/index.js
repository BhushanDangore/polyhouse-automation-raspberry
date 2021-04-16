const firestore = require("firebase").default.firestore();
const database = require("firebase").default.database();

module.exports = {
    firestore,
    database,
    hardwares: firestore.collection("hardwares"),
};
