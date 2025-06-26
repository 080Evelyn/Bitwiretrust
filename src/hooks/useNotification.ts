// import { useEffect, useState } from "react";
// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";
// import { getToken } from "@/utils/AuthStorage";

// export function useNotifications() {
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [walletUpdates, setWalletUpdates] = useState<any[]>([]);

//   useEffect(() => {
//     const token = getToken();

//     if (!token) {
//       console.error("Token missing. Cannot connect to WebSocket.");
//       return;
//     }

//     const socketUrl = `https://bitwire.onrender.com/ws-notifications?token=${token}`;

//     const stompClient = new Client({
//       webSocketFactory: () => new SockJS(socketUrl),
//       reconnectDelay: 5000,
//       debug: (str) => console.log("[STOMP DEBUG]", str),

//       onConnect: (frame) => {
//         console.log("🟢 WebSocket connected!");

//         stompClient.subscribe("/user/queue/notifications", (msg) => {
//           const notif = JSON.parse(msg.body);
//           console.log("🔔 Notification:", notif);
//           setNotifications((prev) => [notif, ...prev]);
//         });

//         stompClient.subscribe("/user/queue/wallet/balance", (msg) => {
//           const update = JSON.parse(msg.body);
//           console.log("💰 Wallet Balance Update:", update);
//           setWalletUpdates((prev) => [update, ...prev]);
//         });
//       },

//       onStompError: (frame) => {
//         console.error("❌ STOMP Error:", frame.headers["message"]);
//         console.error("❌ Details:", frame.body);
//       },

//       onWebSocketError: (event) => {
//         console.error("❌ WebSocket Error:", event);
//       },

//       onDisconnect: () => {
//         console.log("🔌 WebSocket disconnected.");
//       },
//     });

//     stompClient.activate();

//     return () => {
//       if (stompClient.active) {
//         stompClient.deactivate();
//       }
//     };
//   }, []);

//   return { notifications, walletUpdates };
// }
