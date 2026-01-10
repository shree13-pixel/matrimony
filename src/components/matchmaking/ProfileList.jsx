import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
//import "../styles/pageBackground.css";
import "../../styles/pageBackground.css";
import ChatSidebar from "../chat/ChatSidebar";


function ProfileList() {
  const profile = JSON.parse(localStorage.getItem("profile"));

  // Sample matched profiles data
 const matchedProfiles = [
  {
    id: 1,
    name: "Priya",
    age: 26,
    location: "Chennai, Tamil Nadu",
    photo: "pic5.webp",
    profession: "Software Engineer",
    salary: "12 LPA",
    education: "M.Sc Computer Science",
  raasi: "kadagam(cancer)",
  natchathiram: "aayulyam",
    status: "Active",
     isVerified:false,
  isFeatured: true,
    matchReason: "Shared values, location compatibility, education match",
    compatibilityScore: 95
  },
  {
    id: 2,
    name: "Anjali",    age: 24,
    location: "Bangalore, Karnataka",
    photo: "pic4.webp",    profession: "Data Scientist",
    salary: "18 LPA",
    education: "M.Sc Computer Science",
  raasi: "kadagam(cancer)",
  natchathiram: "aayulyam",
    status: "Active",
     isVerified: true,
  isFeatured: true,
    matchReason: "Similar career interests and family values",
    compatibilityScore: 90
  },
  {
    id: 3,
    name: "Divya",
    age: 25,
    location: "Hyderabad, Telangana",
    photo: "OIP.webp",
    profession: "Doctor (Pediatrician)",    salary: "15 LPA",
    status: "Inactive",
    education: "M.Sc Computer Science",
  raasi: "Meenam (Pisces)",
  natchathiram: "Revathi",
     isVerified: true,
  isFeatured: true,
    matchReason: "Compatible interests and life goals",
    compatibilityScore: 88
  },
  {
    id: 4,
    name: "Sneha",
    age: 23,
    location: "Mumbai, Maharashtra",
    photo: "pic2.webp",
    profession: "HR Manager",
    salary: "8 LPA", 
    education: "M.Sc Computer Science",
  raasi: "Meenam (Pisces)",
  natchathiram: "Revathi",   status: "Active",
     isVerified: true,
  isFeatured: true,
    matchReason: "Shared hobbies and cultural preferences",
    compatibilityScore: 86
  },
  {
    id: 5,
    name: "Meera",    age: 27,
    location: "Delhi, NCR",
    photo: "pic1.jpg",
    profession: "Chartered Accountant",
    salary: "20 LPA",
    education: "M.Sc Computer Science",
  raasi: "kadagam(cancer)",
  natchathiram: "aayulyam",
    status: "Active",   
     isVerified: true,
  isFeatured: true, matchReason: "Similar professional background and lifestyle",
    compatibilityScore: 80
  },
  {
    id: 6,
    name: "Kavya",
    age: 25,
    location: "Coimbatore, Tamil Nadu",
    photo: "pic5.webp",
    profession: "Assistant Professor",
    salary: "7 LPA",
    education: "M.Sc Computer Science",
  raasi: "Simmam(Leo)",
  natchathiram: "Magam",
    status: "Active",
     isVerified: false,
  isFeatured: true,
    matchReason: "Educational background and family values match",
    compatibilityScore: 78
  },
  {
    id: 7,
    name: "Riya",
    age: 24,
    location: "Pune, Maharashtra",
    photo: "pic4.webp",
    profession: "UX Designer",
    salary: "10 LPA",
    education: "M.Sc Computer Science",
  raasi: "kanni(virgo)",
  natchathiram: "uthiradam",
    status: "Inactive",
     isVerified: true,
  isFeatured: true,
    matchReason: "Creative interests and lifestyle compatibility",
    compatibilityScore: 74
  },
  {
    id: 8,
    name: "Pooja",
    age: 28,
    location: "Ahmedabad, Gujarat",
    photo: "/pic3.webp",
    profession: "Business Analyst",
    salary: "14 LPA",
    education: "M.Sc Computer Science",
  raasi: "kadagam(cancer)",
  natchathiram: "aayulyam",
    status: "Active",
     isVerified: true,
  isFeatured: true,
    matchReason: "Career goals and maturity level match",
    compatibilityScore: 71
  },
  {
    id: 9,
    name: "Ishani",
    age: 26,
    location: "Kochi, Kerala",
    photo: "/pic2.webp",
    profession: "Civil Engineer",
    salary: "9 LPA",
    education: "M.Sc Computer Science",
  raasi: "Mesham(Aries)",
  natchathiram: "aswini",
    status: "Active",
     isVerified: true,
  isFeatured: true,
    matchReason: "Cultural compatibility and shared interests",
    compatibilityScore: 70
  },
  {
    id: 10,    name: "Swati",
    age: 25,
    location: "Lucknow, Uttar Pradesh",
    photo: "/pic1.jpg",
    profession: "Bank Manager",
    salary: "11 LPA",
    education: "B.Sc Computer Application",
  raasi: "Kanni (Virgo)",
  natchathiram: "uthiram",
    status: "Active",
     isVerified: true,
  isFeatured: true,
    matchReason: "Stable profession and family background",
    compatibilityScore: 73
  }
];

 return (
  <div style={{ display: "flex", height: "100vh" }}>

    {/* LEFT: Main content */}
    <div style={{ flex: 1 }}>
      <div className="page-container fade-in">
        <h2><i className="fas fa-heart"></i> My Matches</h2>

        <div className="card">
          {!profile ? (
            <>
              <p className="text-center" style={{ color: "var(--text-color)", marginBottom: "1.5rem" }}>
                Create your profile to see matches.
              </p>
              <div className="text-center">
                <Link
                  to="/create-profile"
                  className="btn btn-primary"
                  style={{ padding: "10px 24px" }}
                >
                  <i className="fas fa-user-plus"></i> Create Profile
                </Link>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem"
                }}
              >
                <p style={{ margin: 0 }}>
                  Based on your profile, we found {matchedProfiles.length} compatible matches.
                </p>

                <Link
                  to="/create-profile"
                  className="btn btn-info"
                >
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
    </div>

    {/* RIGHT: Chat Sidebar */}
    <ChatSidebar />

  </div>
);

}

export default ProfileList;

