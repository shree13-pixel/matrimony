import { useState } from "react";
import "./ChatSidebar.css";

export default function ChatSidebar() {
  const [isMinimized, setIsMinimized] = useState(false);

  const chats = [
    { id: 1, name: "Balaji.R", count: 2, img: "https://i.pravatar.cc/50?img=11" },
    { id: 2, name: "SH04106795", count: 3, img: "https://i.pravatar.cc/50?img=12" },
    { id: 3, name: "Mani", count: 4, img: "https://i.pravatar.cc/50?img=13" },
    { id: 4, name: "Sekar", count: 5, img: "https://i.pravatar.cc/50?img=14" }
  ];

  /* 🔽 MINIMIZED VIEW */
  if (isMinimized) {
    return (
      <div className="chat-minimized" onClick={() => setIsMinimized(false)}>
        💬 Chats
        <span className="mini-count">9</span>
      </div>
    );
  }

  /* 🔼 EXPANDED VIEW */
  return (
    <div className="chat-sidebar">
      {/* Header */}
      <div className="chat-header">
        <span className="online-dot" />
        Messages
        <button
          className="minimize-btn"
          onClick={() => setIsMinimized(true)}
        >
          x
        </button>
      </div>

      {/* Chat List */}
      <div className="chat-list">
        {chats.map((chat) => (
          <div key={chat.id} className="chat-card">
            <img src={chat.img} alt={chat.name} />
            <div className="chat-info">
              <strong>{chat.name}</strong>
              <p>Has messaged you</p>
            </div>
            <span className="chat-badge">{chat.count}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="chat-footer">
        Alerts (19) | Chats (5) | Active (20)
      </div>
    </div>
  );
}
