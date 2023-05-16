import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBuC7wLZtG6CA0WbIMeN8KUx4vcF92JqlA",
    authDomain: "g-oogle-email-password-auth.firebaseapp.com",
    projectId: "g-oogle-email-password-auth",
    storageBucket: "g-oogle-email-password-auth.appspot.com",
    messagingSenderId: "223543923508",
    appId: "1:223543923508:web:16c01460775957bb44cb61"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {
    app,
    auth
}