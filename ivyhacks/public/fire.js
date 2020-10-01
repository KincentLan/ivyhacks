import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFxy8I3Q-N3EUEVOGWoGya1pxL0x35npg",
    authDomain: "ivyhacks-b3547.firebaseapp.com",
    databaseURL: "https://ivyhacks-b3547.firebaseio.com",
    projectId: "ivyhacks-b3547",
    storageBucket: "ivyhacks-b3547.appspot.com",
    messagingSenderId: "167248186439",
    appId: "1:167248186439:web:8031f0d3fe2d1efdab3562",
    measurementId: "G-Q0T35K7J2H"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;