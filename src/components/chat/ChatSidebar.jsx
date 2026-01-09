import "./ChatSidebar.css";

export default function ChatSidebar() {
  return (
    <div className="bottom-chatbox">
      <div className="chatbox-header">
        🟢 I am Online
      </div>

      <div className="chatbox-body">
        <div className="chat-user">
          <img src="https://i.pravatar.cc/40" alt="" />
          <div>
            <strong>Balaji.R</strong>
            <p>Has messaged you</p>
          </div>
          <span className="badge">2</span>
        </div>

        <div className="chat-user">
          <img src="https://i.pravatar.cc/41" alt="" />
          <div>
            <strong>SH04106790</strong>
            <p>Has messaged you</p>
          </div>
          <span className="badge">2</span>
        </div>
      </div>

      <div className="chatbox-footer">
        Alerts (19) | Chats (2) | Active (20)
      </div>
    </div>
  );
}
