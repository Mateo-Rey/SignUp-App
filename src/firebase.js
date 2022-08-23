import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCQzsuCC-HXL7K1u-Y6HfF47Q9V2QtR8qo",
    authDomain: "auth-proj-b7759.firebaseapp.com",
    projectId: "auth-proj-b7759",
    storageBucket: "auth-proj-b7759.appspot.com",
    messagingSenderId: "413344577442",
    appId: "1:413344577442:web:d67ef510258bdffe9464fb"
  });

export const auth = app.auth()