// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// **新增這兩行來導入 Auth 和 Firestore 的函數**
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj4qs8RcBm0jOQ75NeKo04oewYGX-mgGk",
  authDomain: "track-spending-39695.firebaseapp.com",
  projectId: "track-spending-39695",
  storageBucket: "track-spending-39695.firebasestorage.app",
  messagingSenderId: "694283091878",
  appId: "1:694283091878:web:7065810f58755d0a3c5967",
  measurementId: "G-LKCWH46VSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// **新增這兩行來取得 Auth 和 Firestore 的服務實例**
const auth = getAuth(app); // 取得 Authentication 服務的實例
const db = getFirestore(app); // 取得 Cloud Firestore 資料庫的實例
export{db,auth}
// 現在你有了 app, analytics, auth, 和 db 這幾個實例，可以用它們來呼叫 Firebase 的功能了！