//"firebase": "^7.24.0", 버전확인 필요
// Import the functions you need from the SDKs you need
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

    const firebaseConfig = {
        apiKey: "AIzaSyC-zyO8k02MJTv5wg9hyXdLXTfusvnPCKA",
        authDomain: "chating-dog.firebaseapp.com",
        databaseURL: "https://chating-dog-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "chating-dog",
        storageBucket: "chating-dog.appspot.com",
        messagingSenderId: "566598736914",
        appId: "1:566598736914:web:d0ddae32d652ce9c298ccb",
        measurementId: "G-YLGT01QYX8"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
export default firebase;


