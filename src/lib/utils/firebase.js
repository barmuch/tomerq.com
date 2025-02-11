// Import Firebase SDKs yang dibutuhkan
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Konfigurasi Firebase (gunakan variabel lingkungan untuk keamanan)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "tomerq-75a0d.firebaseapp.com",
  projectId: "tomerq-75a0d",
  storageBucket: "tomerq-75a0d.appspot.com",
  messagingSenderId: "41283268046",
  appId: "1:41283268046:web:1c660344b082ef18c30f9f",
  measurementId: "G-4P4E3076GL"
}

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig)

// Inisialisasi Firestore & Storage
const db = getFirestore(app)
const storage = getStorage(app)

// Ekspor Firebase App, Firestore, dan Storage
export { app, db, storage }
