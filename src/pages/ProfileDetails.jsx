import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pageBackground.css";

function ProfileDetails() {
  const [profile, setProfile] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [formData, setFormData] = useState({
  workStatus: "",
  profession: "",
  company: "",
  salary: ""
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

  // Not working → clear company & salary
  if (name === "workStatus" && value === "not_working") {
    setFormData(prev => ({
      ...prev,
      company: "",
      salary: ""
    }));
  }
};


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
          <div className="profile-section">
  <h3>
    <i className="fas fa-briefcase"></i> Professional Details
  </h3>

  {/* Working Status Dropdown */}
  <div className="form-group">
    <label>Working Status</label>
    <select
      name="workStatus"
      value={formData.workStatus}
      onChange={handleChange}
    >
      <option value="">Select</option>
      <option value="working">Working</option>
      <option value="not_working">Not Working</option>
    </select>
  </div>

  {/* Profession / Job Title - Always Enabled */}
  <div className="form-group">
    <label>Profession / Job Title</label>
    <input
      type="text"
      name="profession"
      value={formData.profession}
      onChange={handleChange}
      placeholder="Eg: Software Engineer"
    />
  </div>

  {/* Company - Disabled if Not Working */}
  <div className="form-group">
    <label>Company</label>
    <input
      type="text"
      name="company"
      value={formData.company}
      onChange={handleChange}
      disabled={formData.workStatus === "not_working"}
    />
  </div>

  {/* Salary - Disabled if Not Working */}
  <div className="form-group">
    <label>Annual Income</label>
    <input
      type="number"
      name="salary"
      value={formData.salary}
      onChange={handleChange}
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