import { Link } from "react-router-dom";
import "../../styles/pageBackground.css";

export default function ProfileCard({ profile }) {
  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "18px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}
    >
      <div style={{ display: "flex", gap: "18px" }}>
        {/* ================= PHOTO ================= */}
        <div
          style={{
            position: "relative",
            width: "130px",
            height: "160px",
            borderRadius: "12px",
            overflow: "hidden",
            flexShrink: 0
          }}
        >
          <img
            src={profile.photo}
            alt={profile.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />

          {/* Verified */}
          {profile.isVerified && (
            <div
              style={{
                position: "absolute",
                top: "8px",
                left: "8px",
                backgroundColor: "#1abc9c",
                color: "#fff",
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px"
              }}
            >
              <i className="fas fa-check"></i>
            </div>
          )}

          {/* Featured */}
          {profile.isFeatured && (
            <div
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                backgroundColor: "#ff9800",
                color: "#fff",
                padding: "3px 8px",
                fontSize: "11px",
                borderRadius: "14px",
                fontWeight: "600"
              }}
            >
              ★ Featured
            </div>
          )}
        </div>

        {/* ================= DETAILS ================= */}
        <div style={{ flex: 1 }}>
          {/* Name + Status */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <h3 style={{ margin: 0 }}>
              {profile.name}, {profile.age}
            </h3>

            <span
              style={{
                fontSize: "12px",
                padding: "4px 10px",
                borderRadius: "12px",
                backgroundColor:
                  profile.status === "Active" ? "#e8f5e9" : "#ffebee",
                color:
                  profile.status === "Active" ? "#2e7d32" : "#c62828",
                fontWeight: "600"
              }}
            >
              {profile.status}
            </span>
          </div>

          {/* Location */}
          <p style={{ margin: "6px 0", color: "#666" }}>
            <i
              className="fas fa-map-marker-alt"
              style={{ marginRight: "6px", color: "#ff5722" }}
            ></i>
            {profile.location}
          </p>

          {/* Profession */}
          <p style={{ margin: "4px 0", color: "#555" }}>
            <i className="fas fa-briefcase" style={{ marginRight: "6px" }}></i>
            {profile.profession}
          </p>

          {/* Salary */}
          <p style={{ margin: "4px 0", color: "#555" }}>
            <i className="fas fa-rupee-sign" style={{ marginRight: "6px" }}></i>
            {profile.salary}
          </p>
<div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "6px 12px",
              marginTop: "8px",
              fontSize: "0.9rem",
              color: "#444"
            }}
          >
            <div>
              <i className="fas fa-graduation-cap" style={{ marginRight: "6px" }}></i>
              <strong>Education:</strong> {profile.education}
            </div>

            <div>
              <i className="fas fa-star" style={{ marginRight: "6px" }}></i>
              <strong>Raasi:</strong> {profile.raasi}
            </div>
 <div>
              <i className="fas fa-moon" style={{ marginRight: "6px" }}></i>
              <strong>Natchathiram:</strong> {profile.natchathiram}
            </div>
          </div>
          {/* AI Match Reason */}
          <div
            style={{
              marginTop: "8px",
              padding: "8px",
              backgroundColor: "#f3f9ff",
              borderLeft: "4px solid #2196f3",
              borderRadius: "6px",
              fontSize: "0.9rem"
            }}
          >
            <i className="fas fa-brain" style={{ marginRight: "6px" }}></i>
            {profile.matchReason}
          </div>

          {/* Compatibility */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px"
            }}
          >
            <span style={{ fontSize: "0.9rem" }}>Compatibility</span>
            <div
              style={{
                width: "120px",
                height: "22px",
                backgroundColor: "#e0e0e0",
                borderRadius: "12px",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  width: `${profile.compatibilityScore}%`,
                  height: "100%",
                  backgroundColor: "#4caf50"
                }}
              ></div>
            </div>
            <strong>{profile.compatibilityScore}%</strong>
          </div>
        </div>
      </div>

      {/* ================= BUTTON ================= */}
      <div style={{ marginTop: "14px", textAlign: "right" }}>
        <Link
          to={`/profile-details?id=${profile.id}`}
          className="btn btn-primary"
        >
          View Full Profile
        </Link>
      </div>
    </div>
  );
}
