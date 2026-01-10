import React from "react";
import { Link } from "react-router-dom";
import "../styles/pageBackground.css";

export default function Dashboard() {
  const user = {
    name: "Prarthana R",
    profileId: "JTR45",
    photo: "/pic1.jpg",
    matchScore: 82,
    trend: [72, 75, 78, 80, 82],
    insights: [
      "Your profile is trending higher today 🔥",
      "Profiles with faster replies get 2x matches",
      "Add 1 more photo to boost visibility"
    ],
    actions: [
      { text: "Add 1 more profile photo", gain: "+6%" },
      { text: "Reply to 2 pending interests", gain: "+4%" },
      { text: "View 5 suggested matches", gain: "+3%" }
    ],
    checklist: [
      { label: "Basic Details", done: true },
      { label: "Education & Job", done: true },
      { label: "Photos (3/4)", done: false },
      { label: "Horoscope", done: false }
    ],
    likelyMatches: [
      "OIP.webp",
      "OIP.webp",
      "OIP.webp"
    ]
  };

  return (
    <div className="page-with-background">
      <div className="page-content">
        <div className="page-container fade-in">

          {/* 🤖 AI ASSISTANT */}
          <div style={assistantBox}>
            <div>
              <h2>🤖 AI Match Assistant</h2>
              <p>
                Good morning <strong>{user.name}</strong> 👋  
                Here’s how your profile is performing today.
              </p>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <Link to="/matches" className="btn btn-success">
                View Matches
              </Link>
              <Link to="/membership" className="btn btn-warning">
                Upgrade
              </Link>
            </div>
          </div>

          {/* SCORE + PROFILE */}
          <div style={twoColGrid}>

            <div style={card}>
              <h3 style={{ color: "#ff6b35" }}>Match Readiness Score</h3>

              <div style={scoreCircle}>
                <span>{user.matchScore}%</span>
              </div>

              <p>You are performing better than <b>78%</b> of users</p>

              <div style={trendBox}>
                {user.trend.map((v, i) => (
                  <div key={i} style={{ ...trendBar, height: `${v}%` }} />
                ))}
              </div>
              <small>Last 5 days trend 📈</small>
            </div>

            <div style={card}>
              <img src={user.photo} alt="profile" style={avatar} />
              <h3>{user.name}</h3>
              <p>{user.profileId}</p>
              <Link to="/my-profile" className="btn btn-outline-primary btn-sm">
                Edit Profile
              </Link>
            </div>

          </div>

          {/* TODAY ACTIONS */}
          <div style={card}>
            <h3>🎯 Today’s Smart Actions</h3>
            <ul>
              {user.actions.map((a, i) => (
                <li key={i}>
                  {a.text} <b style={{ color: "#28a745" }}>{a.gain}</b>
                </li>
              ))}
            </ul>
          </div>

          {/* PROFILE STRENGTH */}
          <div style={card}>
            <h3>☑ Profile Strength Checklist</h3>
            {user.checklist.map((item, i) => (
              <div key={i} style={checkItem}>
                <span>{item.done ? "✅" : "⬜"} {item.label}</span>
              </div>
            ))}
          </div>

          {/* AI INSIGHTS */}
          <div style={insightBox}>
            <h3>✨ AI Insights</h3>
            <ul>
              {user.insights.map((i, index) => (
                <li key={index}>{i}</li>
              ))}
            </ul>
          </div>

          {/* LIKELY INTERESTED */}
          <div style={card}>
            <h3>❤️ Likely Interested Today</h3>
            <div style={{ display: "flex", gap: "1rem" }}>
              {user.likelyMatches.map((img, i) => (
                <img key={i} src={img} alt="" style={miniAvatar} />
              ))}
            </div>
            <small>Based on recent activity & preferences</small>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const assistantBox = {
  background: "linear-gradient(120deg,#fdfbfb,#ebedee)",
  padding: "1.8rem",
  borderRadius: "14px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
  flexWrap: "wrap"
};

const twoColGrid = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "1.5rem",
  marginBottom: "2rem"
};

const card = {
  background: "#fff",
  padding: "1.5rem",
  borderRadius: "14px",
  marginBottom: "1.5rem",
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
};

const scoreCircle = {
  width: "140px",
  height: "140px",
  borderRadius: "50%",
  margin: "1rem auto",
  background: "conic-gradient(#ff6b35 82%, #eee 0)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "36px",
  fontWeight: "bold",
  color: "#ff6b35"
};

const trendBox = {
  display: "flex",
  gap: "6px",
  alignItems: "flex-end",
  height: "60px",
  marginTop: "1rem"
};

const trendBar = {
  width: "12px",
  background: "#ff6b35",
  borderRadius: "4px"
};

const avatar = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "0.5rem"
};

const miniAvatar = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  objectFit: "cover"
};

const insightBox = {
  background: "#fff8f2",
  padding: "1.5rem",
  borderRadius: "14px",
  marginBottom: "1.5rem"
};

const checkItem = {
  padding: "0.4rem 0"
};
