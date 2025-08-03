// src/components/VoiceAgent.js

import React, { useEffect, useState } from "react";
import { startVoiceSession, endVoiceSession } from "../utils/startSession";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCQgKE0AtCHEwrbh2u0tgRHXhokYThvG7o",
  authDomain: "paymentsrecieved-41be3.firebaseapp.com",
  projectId: "paymentsrecieved-41be3",
  storageBucket: "paymentsrecieved-41be3.appspot.com",
  messagingSenderId: "581738015318",
  appId: "1:581738015318:web:0c2560c0d9c175d96e69f7",
  measurementId: "G-YFPTLLQ914",
};

const VoiceAgent = () => {
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    const initFirebaseMessaging = async () => {
      try {
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);

        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );

        console.log("✅ Service worker registered", registration);

        const token = await getToken(messaging, {
          vapidKey:
            "BPHgJRvRatris5RfZWTTYYRpEVXUJa_DpFNjDaxPHqyxZwvYivFnT4LxcJaraR_CT6nEJVQD5rVeCenj0uablr4",
          serviceWorkerRegistration: registration,
        });

        if (token) {
          console.log("✅ FCM Token:", token);
          setFcmToken(token);
        } else {
          console.warn("⚠️ No FCM token received");
        }
      } catch (err) {
        console.error("🔴 Failed to get token", err);
      }
    };

    initFirebaseMessaging();

    // Listen for push-triggered messages from service worker

    let hasHandledFCM = false; // deduplication guard

    navigator.serviceWorker.addEventListener("message", async (event) => {
      console.log("📨 Message from Service Worker:", event.data);
    
      // FCM sends both the raw push + a structured message; we only want the structured one
      if (hasHandledFCM) return;
    
      const data = event.data;
      if (data?.type === "START_VOICE_SESSION") {
        hasHandledFCM = true;
        console.log("🟢 Trigger received: Starting Voice Session...");
        await startVoiceSession();
      }
    });
  }, 
  []);

  const handleStart = async () => {
    try {
      await startVoiceSession();
    } catch (err) {
      alert("Failed to start voice session. Check console.");
    }
  };

  const handleStop = async () => {
    await endVoiceSession();
  };

  return (
    <div>
      <h2>🧠 ElevenLabs Voice Agent</h2>
      <button onClick={handleStart}>▶️ Start Session</button>
      <button onClick={handleStop}>⏹ Stop Session</button>
      {fcmToken && (
        <div>
          <p>🔐 FCM Token Ready:</p>
          <textarea
            readOnly
            value={fcmToken}
            style={{ width: "100%", height: "80px" }}
          />
        </div>
      )}
    </div>
  );
};

export default VoiceAgent;
