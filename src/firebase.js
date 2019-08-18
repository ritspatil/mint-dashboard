import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDrweeydDLEhUkSXkBAYBuGqJaBDRDShoU",
    authDomain: "mint-mining.firebaseapp.com",
    databaseURL: "https://mint-mining.firebaseio.com",
    projectId: "mint-mining",
    storageBucket: "mint-mining.appspot.com",
    messagingSenderId: "447394633442",
    appId: "1:447394633442:web:5dbecf9464b43938"
};

firebase.initializeApp(config);

export default firebase;