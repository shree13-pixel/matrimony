import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pageBackground.css";


function CreateProfilePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);


  const [profile, setProfile] = useState({

    profileFor: '',
    gender: '',
    mobile: '',

    name: '',
    dob: { day: '', month: '', year: '' },
    motherTongue: '',
    email: '',

    height: '',
    weight: '',
    bodyType: '',
    complexion: '',
    physicalStatus: '',
    maritalStatus: '',

    religion: '',
    caste: '',
    subcaste: '',
    gothram: '',
    dosham: 'No',

    location: '',
    city: '',
    state: '',
    country: '',
    citizenship: '',

    education: '',
    educationDetails: '',
    profession: '',
    company: '',
    income: '',
    workLocation: '',

    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    siblingType: '',
    siblingCount: '',
    siblingStatus: '',
    familyType: '',
    familyStatus: '',
    familyValues: '',

    password: '',
    // Multiple Photos
    photos: [],

    music: '',
    reading: '',
    movies: '',
    food: '',
    sports: '',
    travel: '',
    cooking: '',
    dancing: '',

    birthTime: '',
    birthPlace: '',
    raasi: '',
    natchathiram: '',
    manglik: 'No',

    eatingHabit: '',
    smoking: 'No',
    drinking: 'No',

    expectations: '',
    aboutMe: ''
  });

  // Raasi to Natchathiram mapping
  const raasisNatchathirams = {
    'aries': ['Ashwini', 'Bharani', 'Krittika'],
    'taurus': ['Rohini', 'Mrigashira', 'Ardra'],
    'gemini': ['Punarvasu', 'Pushya', 'Ashlesha'],
    'cancer': ['Magha', 'Purva Phalguni', 'Uttara Phalguni'],
    'leo': ['Hasta', 'Chitra', 'Swati'],
    'virgo': ['Vishakha', 'Anuradha', 'Jyeshtha'],
    'libra': ['Mula', 'Purva Ashadha', 'Uttara Ashadha'],
    'scorpio': ['Sravana', 'Dhanishtha', 'Shatabishak'],
    'sagittarius': ['Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'],
    'capricorn': ['Ashwini', 'Bharani', 'Krittika'],
    'aquarius': ['Rohini', 'Mrigashira', 'Ardra'],
    'pisces': ['Punarvasu', 'Pushya', 'Ashlesha']
  };

  useEffect(() => {
    
    const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');
    setProfile(prev => ({
      ...prev,
      profileFor: loginData.profileFor || '',
      gender: loginData.gender || '',
      mobile: loginData.mobile || ''
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProfile(prev => ({
      ...prev,
      photos: [...prev.photos, ...files].slice(0, 6) // Limit to 6 photos
    }));
  };

  const removePhoto = (index) => {
    setProfile(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const submitProfile = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    navigate("/profile-details");
    setShowNotificationPopup(true);
  };
  const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    alert("Browser does not support notifications");
    return;
  }

  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    new Notification("🎉 Notifications Enabled!", {
      body: "You will receive match updates & messages"
    });
  }
};

const handleNotificationLater = () => {
  console.log("User chose to enable notifications later.");
};


  const renderStepIndicator = () => {
    const steps = [
      'Basic Details', 'Family Details', 'Religious', 'Education Details',
       'Password & Photos', 'Hobbies',
      'Horoscope', 'Lifestyle', 'About Me'
    ];

   /* return (
      <div className="step-indicator">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${currentStep === index + 1 ? 'active' : currentStep > index + 1 ? 'completed' : ''}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    );*/
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-section">
            <h3><i className="fas fa-user"></i> Basic Details</h3>
            <div className="form-group">
              <label>Full Name:</label>
              <input name="name" value={profile.name} onChange={handleChange} placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label>Date of Birth:</label>
              <div className="grid-inputs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <select name="dob.day" value={profile.dob.day} onChange={handleChange}>
                  <option value="">Select Day</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <select name="dob.month" value={profile.dob.month} onChange={handleChange}>
                  <option value="">Select Month</option>
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, i) => (
                    <option key={i} value={i + 1}>{month}</option>
                  ))}
                </select>
                <select name="dob.year" value={profile.dob.year} onChange={handleChange}>
                  <option value="">Select Year</option>
                  {Array.from({ length: 60 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Mother Tongue:</label>
              <select name="motherTongue" value={profile.motherTongue} onChange={handleChange}>
                <option value="">Select Mother Tongue</option>
                <option value="tamil">Tamil</option>
                <option value="telugu">Telugu</option>
                <option value="kannada">Kannada</option>
                <option value="malayalam">Malayalam</option>
                <option value="hindi">Hindi</option>
                <option value="english">English</option>
                <option value="marathi">Marathi</option>
                <option value="gujarati">Gujarati</option>
                <option value="urdu">Urdu</option>
                <option value="punjabi">Punjabi</option>
              </select>
            </div>
            <div className="form-group">
              <label>Email Address:</label>
              <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="your.email@example.com" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-section">
            <h3><i className="fas fa-home"></i> Family Details</h3>
            <div className="form-group">
              <label>Father's Name:</label>
              <input name="fatherName" value={profile.fatherName} onChange={handleChange} placeholder="Father's full name" />
            </div>
            <div className="form-group">
              <label>Father's Occupation:</label>
              <input name="fatherOccupation" value={profile.fatherOccupation} onChange={handleChange} placeholder="Father's profession" />
            </div>
            <div className="form-group">
              <label>Mother's Name:</label>
              <input name="motherName" value={profile.motherName} onChange={handleChange} placeholder="Mother's full name" />
            </div>
            <div className="form-group">
              <label>Mother's Occupation:</label>
              <input name="motherOccupation" value={profile.motherOccupation} onChange={handleChange} placeholder="Mother's profession" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label>Sibling Type:</label>
                <select name="siblingType" value={profile.siblingType} onChange={handleChange}>
                  <option value="">Select Type</option>
                  <option value="sister">Sister</option>
                  <option value="brother">Brother</option>
                </select>
              </div>
              <div className="form-group">
                <label>Number of Siblings:</label>
                <input type="number" name="siblingCount" value={profile.siblingCount} onChange={handleChange} placeholder="Enter count" min="0" />
              </div>
            </div>
            <div className="form-group">
              <label>Status of Siblings:</label>
              <input name="siblingStatus" value={profile.siblingStatus} onChange={handleChange} placeholder="e.g., Married, Unmarried, Settled Abroad" />
            </div>
            <div className="form-group">
              <label>Family Type:</label>
              <select name="familyType" value={profile.familyType} onChange={handleChange}>
                <option value="">Select Family Type</option>
                <option value="nuclear">Nuclear Family</option>
                <option value="joint">Joint Family</option>
              </select>
            </div>
            <div className="form-group">
              <label>Family Status:</label>
              <select name="familyStatus" value={profile.familyStatus} onChange={handleChange}>
                <option value="">Select Family Status</option>
                <option value="upper-middle">Upper Middle Class</option>
                <option value="middle">Middle Class</option>
                <option value="lower-middle">Lower Middle Class</option>
              </select>
            </div>
            <div className="form-group">
              <label>Family Values:</label>
              <select name="familyValues" value={profile.familyValues} onChange={handleChange}>
                <option value="">Select Family Values</option>
                <option value="traditional">Traditional</option>
                <option value="moderate">Moderate</option>
                <option value="liberal">Liberal</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-section">
            <h3><i className="fas fa-pray"></i> Religious Details</h3>
            <div className="form-group">
              <label>Religion:</label>
              <input name="religion" value={profile.religion} onChange={handleChange} placeholder="e.g., Hindu, Muslim, Christian" />
            </div>
            <div className="form-group">
              <label>Caste:</label>
              <select name="caste" value={profile.caste} onChange={handleChange}>
                <option value="">Select Caste</option>
                <option value="brahmin">Brahmin</option>
                <option value="kshatriya">Kshatriya</option>
                <option value="vaishya">Vaishya</option>
                <option value="shudra">Shudra</option>
                <option value="chettiar">Chettiar</option>
                <option value="mudaliar">Mudaliar</option>
                <option value="naidu">Naidu</option>
                <option value="reddy">Reddy</option>
              </select>
            </div>
            <div className="form-group">
              <label>Sub Caste:</label>
              <select name="subcaste" value={profile.subcaste} onChange={handleChange}>
                <option value="">Select Sub Caste</option>
                <option value="arivu">Arivu</option>
                <option value="devanga">Devanga</option>
                <option value="gowda">Gowda</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Gothram:</label>
              <select name="gothram" value={profile.gothram} onChange={handleChange}>
                <option value="">Select Gothram</option>
                <option value="agastya">Agastya</option>
                <option value="bharadwaja">Bharadwaja</option>
                <option value="bhrigu">Bhrigu</option>
                <option value="gautama">Gautama</option>
                <option value="kashyapa">Kashyapa</option>
                <option value="kaundinya">Kaundinya</option>
                <option value="vasishtha">Vasishtha</option>
                <option value="vishwamitra">Vishwamitra</option>
              </select>
            </div>
            <div className="form-group">
              <label>Kulam:</label>
              <select name="kulam" value={profile.kulam} onChange={handleChange}>
                <option value="">Select Kulam</option>
                <option value="brahmin">Brahmin</option>
                <option value="kshatriya">Kshatriya</option>
                <option value="vaishya">Vaishya</option>
                <option value="shudra">Shudra</option>
              </select>
            </div>
            <div className="form-group">
              <label>Dosham:</label>
              <select name="dosham" value={profile.dosham} onChange={handleChange}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
        );
        case 4:
        return (
          <div className="form-section">
            <h3><i className="fas fa-graduation-cap"></i> Education Details</h3>
            <div className="form-group">
              <label>Highest Education:</label>
              <select name="education" value={profile.education} onChange={handleChange}>
                <option value="">Select Education</option>
                <option value="high-school">High School</option>
                <option value="intermediate">Intermediate</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">PhD</option>
                <option value="doctorate">Doctorate</option>
              </select>
            </div>
            <div className="form-group">
              <label>Education Details:</label>
              <input name="educationDetails" value={profile.educationDetails} onChange={handleChange} placeholder="e.g., B.Tech in Computer Science" />
            </div>
            <div className="form-section">
            <h3><i className="fas fa-briefcase"></i> Professional Details</h3>
            <div className="form-group">
              <label>Profession:</label>
              <input name="profession" value={profile.profession} onChange={handleChange} placeholder="Your occupation or job title" />
            </div>
            <div className="form-group">
              <label>Company:</label>
              <input name="company" value={profile.company} onChange={handleChange} placeholder="Company name" />
            </div>
            <div className="form-group">
              <label>Annual Income:</label>
              <select name="income" value={profile.income} onChange={handleChange}>
                <option value="">Select Income Range</option>
                <option value="under-2">Under ₹2 Lakhs</option>
                <option value="2-5">₹2-5 Lakhs</option>
                <option value="5-10">₹5-10 Lakhs</option>
                <option value="10-20">₹10-20 Lakhs</option>
                <option value="above-20">Above ₹20 Lakhs</option>
              </select>
            </div>
            <div className="form-group">
              <label>Work Location:</label>
              <input name="workLocation" value={profile.workLocation} onChange={handleChange} placeholder="City where you work" />
            </div>
          </div>
          </div>
        );
      case 5:
        return (
          <div className="form-section">
            <h3><i className="fas fa-map-marker-alt"></i> Location Details</h3>
            <div className="form-group">
              <label>Current Location:</label>
              <input name="location" value={profile.location} onChange={handleChange} placeholder="City, State, Country" />
            </div>
            <div className="form-group">
              <label>City:</label>
              <input name="city" value={profile.city} onChange={handleChange} placeholder="Enter your city" />
            </div>
            <div className="form-group">
              <label>State:</label>
              <input name="state" value={profile.state} onChange={handleChange} placeholder="Enter your state" />
            </div>
            <div className="form-group">
              <label>Country:</label>
              <input name="country" value={profile.country} onChange={handleChange} placeholder="Enter your country" />
            </div>
            <div className="form-group">
              <label>Citizenship:</label>
              <input name="citizenship" value={profile.citizenship} onChange={handleChange} placeholder="Your citizenship" />
            </div>
            <div className="form-group">
              <label>Birth Place:</label>
              <select name="birthPlace" value={profile.birthPlace} onChange={handleChange}>
                <option value="">Select Birth Place</option>
                <option value="chennai">Chennai</option>
                <option value="bangalore">Bangalore</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="kolkata">Kolkata</option>
                <option value="pune">Pune</option>
                <option value="jaipur">Jaipur</option>
                <option value="lucknow">Lucknow</option>
                <option value="chandigarh">Chandigarh</option>
                <option value="coimbatore">Coimbatore</option>
                <option value="kochi">Kochi</option>
                <option value="ahmedabad">Ahmedabad</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        );
      
        case 6:
        return (
          <div className="form-section">
            <h3><i className="fas fa-male"></i> Physical Details</h3>
            <div className="form-group">
              <label>Height:</label>
              <select name="height" value={profile.height} onChange={handleChange}>
                <option value="">Select Height</option>
                <option value="4.6">4'6"</option>
                <option value="4.7">4'7"</option>
                <option value="4.8">4'8"</option>
                <option value="4.9">4'9"</option>
                <option value="4.10">4'10"</option>
                <option value="4.11">4'11"</option>
                <option value="5.0">5'0"</option>
                <option value="5.1">5'1"</option>
                <option value="5.2">5'2"</option>
                <option value="5.3">5'3"</option>
                <option value="5.4">5'4"</option>
                <option value="5.5">5'5"</option>
                <option value="5.6">5'6"</option>
                <option value="5.7">5'7"</option>
                <option value="5.8">5'8"</option>
                <option value="5.9">5'9"</option>
                <option value="5.10">5'10"</option>
                <option value="5.11">5'11"</option>
                <option value="6.0">6'0"</option>
                <option value="6.1">6'1"</option>
                <option value="6.2">6'2"</option>
              </select>
            </div>
            <div className="form-group">
              <label>Weight:</label>
              <input name="weight" value={profile.weight} onChange={handleChange} placeholder="e.g., 65 kg" />
            </div>
            <div className="form-group">
              <label>Body Type:</label>
              <select name="bodyType" value={profile.bodyType} onChange={handleChange}>
                <option value="">Select Body Type</option>
                <option value="slim">Slim</option>
                <option value="athletic">Athletic</option>
                <option value="average">Average</option>
                <option value="heavy">Heavy</option>
              </select>
            </div>
            <div className="form-group">
              <label>Complexion:</label>
              <select name="complexion" value={profile.complexion} onChange={handleChange}>
                <option value="">Select Complexion</option>
                <option value="fair">Fair</option>
                <option value="wheatish">Wheatish</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="form-group">
              <label>Physical Status:</label>
              <select name="physicalStatus" value={profile.physicalStatus} onChange={handleChange}>
                <option value="">Select Physical Status</option>
                <option value="normal">Normal</option>
                <option value="physically-challenged">Physically Challenged</option>
              </select>
            </div>
            <div className="form-group">
              <label>Marital Status:</label>
              <select name="maritalStatus" value={profile.maritalStatus} onChange={handleChange}>
                <option value="">Select Marital Status</option>
                <option value="never-married">Never Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
                <option value="separated">Separated</option>
              </select>
            </div>
          </div>
        );
      
      /*case 8:
        return (
          <div className="form-section">
            <h3><i className="fas fa-lock"></i> Create Password</h3>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" name="password" value={profile.password} onChange={handleChange} placeholder="Create a strong password" />
            </div>
          </div>
        );*/      
        case 7:
        return (
          
          <div className="form-section">
            <div className="form-group">
              <label>Password:</label>
              <input type="password" name="password" value={profile.password} onChange={handleChange} placeholder="Create a strong password" />
            </div>
            <h3><i className="fas fa-camera"></i> Upload Photos</h3>
            <div className="form-group">
              <label>Profile Photos (Max 6):</label>
              <input type="file" accept="image/*" multiple onChange={handleFileChange} />
              <small style={{ color: 'var(--text-color)', opacity: 0.7 }}>
                Upload clear, recent photos for better matches. First photo will be your profile picture.
              </small>
            </div>
            {profile.photos.length > 0 && (
              <div className="photo-preview">
                <h4>Selected Photos:</h4>
                <div className="photo-grid">
                  {profile.photos.map((photo, index) => (
                    <div key={index} className="photo-item">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Photo ${index + 1}`}
                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="remove-photo"
                        style={{
                          position: 'absolute',
                          top: '-5px',
                          right: '-5px',
                          background: 'red',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer'
                        }}
                      >
                        ×
                      </button>
                      {index === 0 && <span className="profile-pic-badge">Profile Pic</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      /*case 7:
        return (
          <div className="form-section">
            <h3><i className="fas fa-music"></i> Hobbies and Interests</h3>
            <div className="form-group">
              <label>Music:</label>
              <input name="music" value={profile.music} onChange={handleChange} placeholder="Your favorite music genres" />
            </div>
            <div className="form-group">
              <label>Reading:</label>
              <input name="reading" value={profile.reading} onChange={handleChange} placeholder="Books, magazines, etc." />
            </div>
            <div className="form-group">
              <label>Movies:</label>
              <input name="movies" value={profile.movies} onChange={handleChange} placeholder="Favorite movie genres" />
            </div>
            <div className="form-group">
              <label>Food:</label>
              <input name="food" value={profile.food} onChange={handleChange} placeholder="Favorite cuisines or dishes" />
            </div>
            <div className="form-group">
              <label>Sports:</label>
              <input name="sports" value={profile.sports} onChange={handleChange} placeholder="Sports you play or follow" />
            </div>
            <div className="form-group">
              <label>Travel:</label>
              <input name="travel" value={profile.travel} onChange={handleChange} placeholder="Favorite destinations or travel interests" />
            </div>
            <div className="form-group">
              <label>Cooking:</label>
              <input name="cooking" value={profile.cooking} onChange={handleChange} placeholder="Cooking skills or favorite dishes to cook" />
            </div>
            <div className="form-group">
              <label>Dancing:</label>
              <input name="dancing" value={profile.dancing} onChange={handleChange} placeholder="Dance forms you know or enjoy" />
            </div>
          </div>
        );*/
      case 8:
        return (
          <div className="form-section">
            <h3><i className="fas fa-star"></i> Horoscope Details</h3>
            <div className="form-group">
              <label>Birth Time:</label>
              <input name="birthTime" value={profile.birthTime} onChange={handleChange} placeholder="HH:MM (24-hour format)" />
            </div>
            <div className="form-group">
              <label>Raasi:</label>
              <select name="raasi" value={profile.raasi} onChange={handleChange}>
                <option value="">Select Raasi</option>
                <option value="aries">Aries</option>
                <option value="taurus">Taurus</option>
                <option value="gemini">Gemini</option>
                <option value="cancer">Cancer</option>
                <option value="leo">Leo</option>
                <option value="virgo">Virgo</option>
                <option value="libra">Libra</option>
                <option value="scorpio">Scorpio</option>
                <option value="sagittarius">Sagittarius</option>
                <option value="capricorn">Capricorn</option>
                <option value="aquarius">Aquarius</option>
                <option value="pisces">Pisces</option>
              </select>
            </div>
            <div className="form-group">
              <label>Natchathiram:</label>
              <select name="natchathiram" value={profile.natchathiram} onChange={handleChange} disabled={!profile.raasi}>
                <option value="">Select Natchathiram</option>
                {profile.raasi && raasisNatchathirams[profile.raasi] && 
                  raasisNatchathirams[profile.raasi].map((natch, i) => (
                    <option key={i} value={natch}>{natch}</option>
                  ))
                }
              </select>
            </div>
            <div className="form-group">
              <label>Manglik:</label>
              <select name="manglik" value={profile.manglik} onChange={handleChange}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
             <h3><i className="fas fa-glass-martini-alt"></i> Lifestyle</h3>
            <div className="form-group">
              <label>Eating Habit:</label>
              <select name="eatingHabit" value={profile.eatingHabit} onChange={handleChange}>
                <option value="">Select Eating Habit</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="eggetarian">Eggetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
            <div className="form-group">
              <label>Smoking:</label>
              <select name="smoking" value={profile.smoking} onChange={handleChange}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="occasionally">Occasionally</option>
              </select>
            </div>
            <div className="form-group">
              <label>Drinking:</label>
              <select name="drinking" value={profile.drinking} onChange={handleChange}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="occasionally">Occasionally</option>
              </select>
            </div>
          </div>
        );
     
      case 9:
        return (
          <div className="form-section">
            <h3><i className="fas fa-user-edit"></i> About Me & Expectations</h3>
            <div className="form-group">
              <label>About Me:</label>
              <textarea
                name="aboutMe"
                value={profile.aboutMe}
                onChange={handleChange}
                placeholder="Tell us about yourself, your personality, goals, etc."
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>Partner Expectations:</label>
              <textarea
                name="expectations"
                value={profile.expectations}
                onChange={handleChange}
                placeholder="What are you looking for in a partner?"
                rows="4"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-with-background">
      <div className="page-content">
        <div className="page-container fade-in">
          <h2><i className="fas fa-user-plus"></i> Create Profile</h2>
 

      {renderStepIndicator()}

      <div className="card">
        {renderStep()}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        {currentStep > 1 && (
          <button onClick={prevStep} className="btn btn-outline">
            <i className="fas fa-arrow-left"></i> Previous
          </button>
        )}

        {currentStep < 9 ? (
          <button onClick={nextStep} className="btn btn-primary" style={{ marginLeft: 'auto' }}>
            Next <i className="fas fa-arrow-right"></i>
          </button>
        ) : (
          <button onClick={submitProfile} className="btn btn-success" style={{ marginLeft: 'auto' }}>
            <i className="fas fa-check"></i> Create Profile
          </button>
        )}
        {showNotificationPopup && (
  <div className="notification-modal">
    <div className="notification-box">
      <h3>Enable Notifications?</h3>
      <p>Get match alerts, messages & profile views</p>

      <button
        className="btn btn-primary"
        onClick={() => {
          requestNotificationPermission();
          setShowNotificationPopup(false);
          navigate("/profile-details");
        }}
      >
        Allow
      </button>

      <button
        className="btn btn-outline"
        onClick={() => {
          setShowNotificationPopup(false);
          navigate("/profile-details");
        }}
      >
        Ask Me Later
      </button>
    </div>
  </div>
)}

        </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProfilePage;
