# ERSS
Emergency Response Service System with UK emergency numbers (999, 112).

## Setup
1. **Firebase**:
   - Create a project at [firebase.google.com](https://firebase.google.com).
   - Enable Authentication (Email/Password), Firestore, Cloud Messaging.
   - Update `firebaseConfig` in `src/firebase.js` and `public/firebase-messaging-sw.js`.
   - Generate VAPID key and update `YOUR_VAPID_PUBLIC_KEY` in `App.js`.

2. **Dependencies**:
   ```bash
   npm install
   cd functions
   npm install