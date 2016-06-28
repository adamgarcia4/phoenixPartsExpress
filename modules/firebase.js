var firebase = require ('firebase');

var firebaseConfig = {
  serviceAccount: "serviceAcc.json",
  databaseURL: "https://phoenixparts-6923b.firebaseio.com/"
}

var firebaseApp = firebase.initializeApp(firebaseConfig);
var db = firebaseApp.database();
var ref = db.ref("root");
module.exports = ref;