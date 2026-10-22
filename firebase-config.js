// Copy this file to firebase-config.js and fill in values from Firebase Console.
// Keep public web config here only; NEVER put service-account private keys in browser code.
export const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
export const firebaseReady = !Object.values(firebaseConfig).some(v => String(v).startsWith("YOUR_"));