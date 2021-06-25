import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBm58arLBCxHkwApxSQzDBSaQJFetuPM-Y",
    authDomain: "voice-43ab9.firebaseapp.com",
    databaseURL: "https://voice-43ab9-default-rtdb.firebaseio.com",
    projectId: "voice-43ab9",
    storageBucket: "voice-43ab9.appspot.com",
    messagingSenderId: "211438195730",
    appId: "1:211438195730:web:29ca5996d375fb0fcf74cb",
    measurementId: "G-QP0J48W61L"
  };

const fire=firebase.initializeApp(firebaseConfig)

export default fire;