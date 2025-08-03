import { Conversation } from "@elevenlabs/client";

let conversation = null;
let isStarting = false;

export async function startVoiceSession() {
  if (isStarting || (conversation && conversation.sessionState === "active")) {
    console.warn("⚠️ Voice session already starting or running");
    return;
  }

  const dynamicVariables = {
    first_name: "hassan",
    user_id: "sads",
  };

  try {
    isStarting = true;
    console.log("🎙 Requesting mic permission...");
    await navigator.mediaDevices.getUserMedia({ audio: true });

    console.log("🔌 Connecting to ElevenLabs...");
    conversation = await Conversation.startSession({
      agentId: "agent_01jzzwg28gfe9950khc55s3895",
      dynamicVariables,

      onConnect: () => {
        console.log("✅ Connected to agent");
      },

      onDisconnect: () => {
        console.log("❌ Disconnected from agent");
        conversation = null;
      },

      onError: (err) => {
        console.error("🔥 Session error:", err);
        conversation = null;
      },

      onMessage: (message) => {
        console.log("💬 Agent said:", message.text);
      },

      onModeChange: (mode) => {
        console.log("🎙 Mode:", mode.mode);
      },
    });

    console.log("🎉 Voice session started!");
    return conversation;
  } catch (err) {
    console.error("🚫 Failed to start voice session:", err);
    throw err;
  } finally {
    isStarting = false;
  }
}

export async function endVoiceSession() {
  if (conversation) {
    await conversation.endSession();
    console.log("🛑 Voice session ended.");
    conversation = null;
  }
}
