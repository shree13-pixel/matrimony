import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
//import "../styles/pageBackground.css";
import "../../styles/pageBackground.css";

function ProfileList() {
  const profile = JSON.parse(localStorage.getItem("profile"));

  // Sample matched profiles data
  const matchedProfiles = [
    {
      id: 1,
      name: "Priya",
      age: 26,
      location: "Chennai, Tamil Nadu",
      photo: null,
      matchReason: "Shared values, location compatibility, education match",
      compatibilityScore: 85
    },
    {
      id: 2,
      name: "Anjali",
      age: 24,
      location: "Bangalore, Karnataka",
      photo: null,
      matchReason: "Similar career interests and family values",
      compatibilityScore: 78
    },
    {
      id: 3,
      name: "Divya",
      age: 25,
      location: "Hyderabad, Telangana",
      photo: null,
      matchReason: "Compatible interests and life goals",
      compatibilityScore: 82
    },
    {
      id: 4,
      name: "Sneha",
      age: 23,
      location: "Mumbai, Maharashtra",
      photo: null,
      matchReason: "Shared hobbies and cultural preferences",
      compatibilityScore: 76
    },
    {
      id: 5,
      name: "Meera",
      age: 27,
      location: "Delhi, NCR",
      photo: null,
      matchReason: "Similar professional background and lifestyle",
      compatibilityScore: 80
    }
  ];

  return (
    <div className="page-container fade-in">
      <h2><i className="fas fa-heart"></i> My Matches</h2>

      <div className="card">
        {!profile ? (
          <>
            <p className="text-center" style={{ color: "var(--text-color)", marginBottom: "1.5rem" }}>
              Create your profile to see matches.
            </p>
            <div className="text-center">
              <Link to="/create-profile" className="btn btn-primary" style={{ display: "inline-block", padding: "10px 24px", fontSize: "1rem" }}>
                <i className="fas fa-user-plus"></i> Create Profile
              </Link>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <p style={{ color: "var(--text-color)", margin: 0 }}>
                Based on your profile, we found {matchedProfiles.length} compatible matches for you. View their profiles and send connection requests.
              </p>
              <Link to="/create-profile" className="btn btn-info" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", fontSize: "0.95rem", whiteSpace: "nowrap" }}>
                <i className="fas fa-user-circle"></i> My Profile
              </Link>
            </div>

            <div>
              {matchedProfiles.map((matchProfile) => (
                <ProfileCard key={matchProfile.id} profile={matchProfile} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileList;

