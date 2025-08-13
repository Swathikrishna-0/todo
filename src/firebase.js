// src/firebase.js
import { initializeApp, getApps } from 'firebase/app'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBRt3D7m2gusYN6LHYplb8zf2WCETazVqY",
  authDomain: "todo-60cbd.firebaseapp.com",
  projectId: "todo-60cbd",
  storageBucket: "todo-60cbd.firebasestorage.app",
  messagingSenderId: "436228993254",
  appId: "1:436228993254:web:3131e850f34a1fe2988b27",
  measurementId: "G-4EFC44QT8L"
};

// ✅ Only initialize if no apps exist
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

export const ensureAnonAuth = () =>
  new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) return resolve(user)
        const cred = await signInAnonymously(auth)
        resolve(cred.user)
      } catch (e) { reject(e) }
    })
  })
