importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyA4_x1F8BZkGUxpimGHyXHD49CLzTI-OVY",
  authDomain: "erss-cb363.firebaseapp.com",
  projectId: "erss-cb363",
  storageBucket: "erss-cb363.firebasestorage.app",
  messagingSenderId: "317809251932",
  appId: "1:317809251932:web:69ae0431888f55800a7899"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});