import { Link } from "react-router-dom";

export default function ProfileCard({ profile }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "16px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      overflow: "hidden"
    }}>
      <div style={{ display: "flex", gap: "16px" }}>
        {/* Profile Photo */}
        <div style={{ flexShrink: 0 }}>
          {profile.photo ? (
            <img 
              src={profile.photo} 
              alt={profile.name}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "8px",
                objectFit: "cover"
              }}
            />
          ) : (
            <div style={{
              width: "100px",
              height: "100px",
              borderRadius: "8px",
              backgroundColor: "#e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999"
            }}>
              <i className="fas fa-user" style={{ fontSize: "2rem" }}></i>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>
            {profile.name}, {profile.age}
          </h3>
          <p style={{ margin: "4px 0", color: "#666", fontSize: "0.95rem" }}>
            <i className="fas fa-map-marker-alt" style={{ marginRight: "6px", color: "#007bff" }}></i>
            {profile.location || profile.place || "Location not specified"}
          </p>

          {/* AI-Generated Match Reason */}
          <p style={{ 
            margin: "8px 0", 
            padding: "8px", 
            backgroundColor: "#f0f8ff", 
            borderRadius: "4px",
            fontSize: "0.9rem",
            color: "#333",
            borderLeft: "3px solid #007bff"
          }}>
            <i className="fas fa-lightbulb" style={{ marginRight: "6px", color: "#007bff" }}></i>
            {profile.matchReason || "Shared values and location compatibility"}
          </p>

          {/* Compatibility Score */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px",
            marginTop: "8px"
          }}>
            <span style={{ fontSize: "0.9rem", color: "#666" }}>Compatibility:</span>
            <div style={{
              width: "100px",
              height: "24px",
              backgroundColor: "#e0e0e0",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative"
            }}>
              <div style={{
                width: `${profile.compatibilityScore || 75}%`,
                height: "100%",
                backgroundColor: "#28a745",
                borderRadius: "12px",
                transition: "width 0.3s ease"
              }}></div>
            </div>
            <span style={{ 
              fontSize: "0.95rem", 
              fontWeight: "bold", 
              color: "#28a745",
              minWidth: "40px"
            }}>
              {profile.compatibilityScore || 75}%
            </span>
          </div>
        </div>
      </div>

      {/* View Profile Button */}
      <div style={{ marginTop: "12px", textAlign: "right" }}>
        <Link 
          to={`/profile-details?id=${profile.id || 1}`}
          className="btn btn-primary"
          style={{
            display: "inline-block",
            padding: "8px 16px",
            fontSize: "0.95rem"
          }}
        >
          <i className="fas fa-eye" style={{ marginRight: "6px" }}></i>
          View Profile
        </Link>
      </div>
    </div>
  );
}
