import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pageBackground.css";

function ProfileDetails() {
  const [profile, setProfile] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [formData, setFormData] = useState({
  education: "",
  stream: "", // Added stream
  workStatus: "",
  profession: "",
  company: "",
  salary: "",
});

  const navigate = useNavigate();

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile) {
      setProfile(savedProfile);
    } else {
      navigate("/create-profile");
    }
  }, [navigate]);
  useEffect(() => {
  if (profile) {
    setFormData({
      education: profile.education || "",
      workStatus: profile.workStatus || "",
      profession: profile.profession || "",
      company: profile.company || "",
      salary: profile.salary || ""
    });
  }
}, [profile]);

useEffect(() => {
  if (profile) {
    setFormData({
      education: profile.education || "",
      stream: profile.stream || "", // Added stream
      workStatus: profile.workStatus || "",
      profession: profile.profession || "",
      company: profile.company || "",
      salary: profile.salary || ""
    });
  }
}, [profile]);
  if (!profile) {
    return (
      <div className="page-with-background">
        <div className="page-content">
          <div className="page-container fade-in">
            <div className="card">
              <p className="text-center">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: value
  }));

  // If Not Working → clear job fields
  if (name === "workStatus" && value === "not_working") {
    setFormData(prev => ({
      ...prev,
      profession: "",
      company: "",
      salary: ""
    }));
  }
};
// Add 'stream' to your initial state


// Update the useEffect to include stream



  const calculateAge = () => {
    if (!profile.dob?.day || !profile.dob?.month || !profile.dob?.year) return null;
    const birthDate = new Date(profile.dob.year, profile.dob.month - 1, profile.dob.day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge();

  return (
    <div className="page-with-background">
      <div className="page-content">
        <div className="page-container fade-in">
          <h2><i className="fas fa-user-circle"></i> Profile Details</h2>

      <div className="profile-details-container">
        {/* Photo Gallery Section */}
        <div className="profile-photos-section">
          <div className="main-photo">
            {profile.photos && profile.photos.length > 0 ? (
              <img
                src={URL.createObjectURL(profile.photos[activePhotoIndex])}
                alt={`Profile photo ${activePhotoIndex + 1}`}
                className="profile-main-image"
              />
            ) : (
              <div className="no-photo">
                <i className="fas fa-user-circle"></i>
                <p>No photos uploaded</p>
              </div>
            )}
          </div>

          {profile.photos && profile.photos.length > 1 && (
            <div className="photo-thumbnails">
              {profile.photos.map((photo, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(photo)}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${activePhotoIndex === index ? 'active' : ''}`}
                  onClick={() => setActivePhotoIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
    </div>

        {/* Profile Information Sections */}
        <div className="profile-info-sections">
          {/* Basic Information */}
          <div className="profile-section">
            <h3><i className="fas fa-user"></i> Basic Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Name:</label>
                <span>{profile.name || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Age:</label>
                <span>{age ? `${age} years` : 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Date of Birth:</label>
                <span>
                  {profile.dob?.day && profile.dob?.month && profile.dob?.year
                    ? `${profile.dob.day}/${profile.dob.month}/${profile.dob.year}`
                    : 'Not specified'}
                </span>
              </div>
              <div className="info-item">
                <label>Mother Tongue:</label>
                <span>{profile.motherTongue || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{profile.email || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Mobile:</label>
                <span>{profile.mobile || 'Not specified'}</span>
              </div>
            </div>
          </div>

          {/* Family Details */}
          <div className="profile-section">
            <h3><i className="fas fa-home"></i> Family Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Father's Name:</label>
                <span>{profile.fatherName || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Father's Occupation:</label>
                <span>{profile.fatherOccupation || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Mother's Name:</label>
                <span>{profile.motherName || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Mother's Occupation:</label>
                <span>{profile.motherOccupation || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Siblings:</label>
                <span>{profile.siblings || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Family Type:</label>
                <span>{profile.familyType || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Family Status:</label>
                <span>{profile.familyStatus || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Family Values:</label>
                <span>{profile.familyValues || 'Not specified'}</span>
              </div>
            </div>
          </div>
{/* Education & Professional */}
          
{/* Education & Professional */}
<div className="profile-section">
  <h3>
    <i className="fas fa-graduation-cap"></i> Education Details
  </h3>

  {/* Highest Education Dropdown */}
  <div className="form-group">
    <label>Highest Education</label>
    <select
      name="education"
      value={formData.education}
      onChange={handleChange}
    >
      <option value="">Select Education</option>
      <optgroup label="Engineering/Technology">
        <option value="BE">B.E (Bachelor of Engineering)</option>
        <option value="BTech">B.Tech (Bachelor of Technology)</option>
        <option value="ME">M.E (Master of Engineering)</option>
        <option value="MTech">M.Tech (Master of Technology)</option>
      </optgroup>
      <optgroup label="Management/Computer">
        <option value="MBA">MBA</option>
        <option value="MCA">MCA</option>
        <option value="BCA">BCA</option>
      </optgroup>
      <optgroup label="Medical/Science/Others">
        <option value="MBBS">MBBS</option>
        <option value="MD">MD</option>
        <option value="BSc">B.Sc</option>
        <option value="MSc">M.Sc</option>
        <option value="BCom">B.Com</option>
        <option value="PhD">Ph.D</option>
        <option value="Diploma">Diploma</option>
      </optgroup>    </select>
  </div>

  {/* Stream Dropdown */}
  <div className="form-group">
    <label>Stream / Specialization</label>
    <select
      name="stream"      value={formData.stream}
      onChange={handleChange}
    >
      <option value="">Select Stream</option>
      <option value="Computer Science">Computer Science</option>
      <option value="Information Technology">Information Technology</option>
      <option value="Electronics & Communication">Electronics & Communication</option>      <option value="Mechanical">Mechanical Engineering</option>
      <option value="Civil">Civil Engineering</option>
      <option value="Electrical">Electrical Engineering</option>
      <option value="Finance">Finance</option>
      <option value="Marketing">Marketing</option>
      <option value="Human Resources">Human Resources</option>
      <option value="General Medicine">General Medicine</option>
      <option value="Science">Science</option>
      <option value="Commerce">Commerce</option>
      <option value="Arts">Arts</option>
    </select>
  </div>

  <hr style={{ margin: '20px 0', border: '0.1px solid #eee' }} />
  
  <h3>
    <i className="fas fa-briefcase"></i> Professional Details
  </h3>

  {/* Work Status */}
  <div className="form-group">
    <label>Work Status</label>
    <select
      name="workStatus"
      value={formData.workStatus}
      onChange={handleChange}
    >
      <option value="">Select Status</option>
      <option value="working">Working</option>
      <option value="not_working">Not Working</option>
    </select>
  </div>

  {/* Profession */}
  <div className="form-group">
    <label>Profession / Job Title</label>
    <input
      type="text"
      name="profession"
      value={formData.profession}
      onChange={handleChange}
      placeholder="Your occupation or job title"
      disabled={formData.workStatus === "not_working"}
    />
  </div>

  {/* Company */}
  <div className="form-group">
    <label>Company</label>
    <input
      type="text"
      name="company"
      value={formData.company}
      onChange={handleChange}
      placeholder="Company name"
      disabled={formData.workStatus === "not_working"}
    />
  </div>

  {/* Salary */}
  <div className="form-group">
    <label>Annual Income</label>
    <input
      type="number"
      name="salary"
      value={formData.salary}
      onChange={handleChange}
      placeholder="Eg: 600000"
      disabled={formData.workStatus === "not_working"}
    />
  </div>
</div>

          {/* Religious Details */}
          <div className="profile-section">
            <h3><i className="fas fa-pray"></i> Religious Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Religion:</label>
                <span>{profile.religion || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Caste:</label>
                <span>{profile.caste || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Sub Caste:</label>
                <span>{profile.subcaste || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Gothram:</label>
                <span>{profile.gothram || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Dosham:</label>
                <span>{profile.dosham || 'Not specified'}</span>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="profile-section">
            <h3><i className="fas fa-map-marker-alt"></i> Location Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Current Location:</label>
                <span>{profile.location || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>City:</label>
                <span>{profile.city || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>State:</label>
                <span>{profile.state || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Country:</label>
                <span>{profile.country || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Citizenship:</label>
                <span>{profile.citizenship || 'Not specified'}</span>
              </div>
            </div>
          </div>

          

         
           {/* Physical Details */}
          <div className="profile-section">
            <h3><i className="fas fa-male"></i> Physical Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Height:</label>
                <span>{profile.height || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Weight:</label>
                <span>{profile.weight || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Body Type:</label>
                <span>{profile.bodyType || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Complexion:</label>
                <span>{profile.complexion || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Physical Status:</label>
                <span>{profile.physicalStatus || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Marital Status:</label>
                <span>{profile.maritalStatus || 'Not specified'}</span>
              </div>
            </div>
          </div>

          
          {/* Horoscope Details */}
          <div className="profile-section">
            <h3><i className="fas fa-star"></i> Horoscope Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Birth Time:</label>
                <span>{profile.birthTime || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Birth Place:</label>
                <span>{profile.birthPlace || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Raasi:</label>
                <span>{profile.raasi || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Natchathiram:</label>
                <span>{profile.natchathiram || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Manglik:</label>
                <span>{profile.manglik || 'Not specified'}</span>
              </div>
            </div>
          </div>

          {/* Lifestyle */}
          <div className="profile-section">
            <h3><i className="fas fa-glass-martini-alt"></i> Lifestyle</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Eating Habit:</label>
                <span>{profile.eatingHabit || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Smoking:</label>
                <span>{profile.smoking || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <label>Drinking:</label>
                <span>{profile.drinking || 'Not specified'}</span>
              </div>
               <div className="profile-section">
              <h3><i className="fas fa-user-edit"></i> About Me & Expectations</h3>
              {profile.aboutMe && (
                <div className="text-section">
                  <label>About Me:</label>
                  <p>{profile.aboutMe}</p>
                </div>
              )}
              {profile.expectations && (
                <div className="text-section">
                  <label>Partner Expectations:</label>
                  <p>{profile.expectations}</p>
                </div>
              )}
            </div>
            </div>
          </div>

         

      {/* Action Buttons */}
      <div className="profile-actions">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/create-profile")}
        >
          <i className="fas fa-edit"></i> Edit Profile
        </button>
        <button
          className="btn btn-outline"
          onClick={() => navigate("/matches")}
        >
          <i className="fas fa-users"></i> View Matches
        </button>
        </div>
        </div>
        </div>
      </div>
    </div>
  
  );
}


export default ProfileDetails;