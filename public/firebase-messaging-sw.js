// public/firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCQgKE0AtCHEwrbh2u0tgRHXhokYThvG7o",
  authDomain: "paymentsrecieved-41be3.firebaseapp.com",
  databaseURL: "https://paymentsrecieved-41be3-default-rtdb.firebaseio.com",
  projectId: "paymentsrecieved-41be3",
  storageBucket: "paymentsrecieved-41be3.appspot.com",
  messagingSenderId: "581738015318",
  appId: "1:581738015318:web:0c2560c0d9c175d96e69f7",
  measurementId: "G-YFPTLLQ914"
});

const messaging = firebase.messaging();

self.addEventListener("push", function (event) {
    let payload = {};
    try {
      payload = event.data.json();
    } catch (e) {
      console.error("❌ Push event data is not JSON", e);
    }
  
    console.log("[SW] 📦 Push received:", payload);
  
    if (payload.notification) {
      self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/icon.png",
      });
    }
  
    event.waitUntil(
      clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
        if (clientList.length === 0) {
          console.warn("[SW] ⚠️ No open client to send message to");
        } else {
          console.log("[SW] 📤 Sending message to tab...");
          clientList[0].postMessage({
            type: "START_VOICE_SESSION",
            payload: payload.data || {},
          });
        }
      })
    );
  });
  