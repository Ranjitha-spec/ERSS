import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'; // Import Functions

const firebaseConfig = {
  apiKey: "AIzaSyA4_x1F8BZkGUxpimGHyXHD49CLzTI-OVY",
  authDomain: "erss-cb363.firebaseapp.com",
  projectId: "erss-cb363",
  storageBucket: "erss-cb363.firebasestorage.app",
  messagingSenderId: "317809251932",
  appId: "1:317809251932:web:69ae0431888f55800a7899"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const messaging = getMessaging(app);
export const db = getFirestore(app);
export const functions = getFunctions(app); // Initialize and export Functions

// Connect to emulators if running locally (for development/testing)
if (process.env.NODE_ENV === 'development') {
  // Connect to Auth Emulator
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  
  // Connect to Firestore Emulator
  connectFirestoreEmulator(db, 'localhost', 8080);
  
  // Connect to Functions Emulator
  connectFunctionsEmulator(functions, 'localhost', 5001);
  
  console.log('Connected to Firebase Emulators for local testing');
}

// Note: Firebase Cloud Messaging (messaging) is not supported in the emulator.
// Test messaging-related functionality in production.