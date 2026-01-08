import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    profileFor: '',
    gender: '',
    mobile: ''
  });
  const [aadharData, setAadharData] = useState({
    lastFourDigits: '',
    verificationMobile: ''
  });
  const [aadharVerified, setAadharVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  

  const validateRegisterForm = () => {
    const newErrors = {};
    if (!aadharVerified) {
      newErrors.aadhar = 'Please verify your Aadhar first';
    }
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.profileFor) newErrors.profileFor = 'Please select profile type';
    if (!formData.gender) newErrors.gender = 'Please select gender';
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile = 'Enter valid 10-digit mobile number';
    }
    return newErrors;
  };

  const handleRegister = async () => {
    const validationErrors = validateRegisterForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      profileFor: formData.profileFor,
      gender: formData.gender,
      mobile: formData.mobile
    });
    setLoading(false);

    if (result.success) {
      navigate('/profiles');
    } else {
      setErrors({ general: result.error || 'Registration failed' });
    }
  };
const handleAadharChange = (e) => {
    const { name, value } = e.target;
    setAadharData({ ...aadharData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateAadhar = () => {
    const newErrors = {};
    if (!aadharData.lastFourDigits) {
      newErrors.lastFourDigits = 'Aadhar last 4 digits are required';
    } else if (aadharData.lastFourDigits.length !== 4 || !/^\d+$/.test(aadharData.lastFourDigits)) {
      newErrors.lastFourDigits = 'Enter valid 4-digit Aadhar number';
    }
    if (!aadharData.verificationMobile) {
      newErrors.verificationMobile = 'Registered mobile number is required';
    } else if (aadharData.verificationMobile.length !== 10) {
      newErrors.verificationMobile = 'Enter valid 10-digit mobile number';
    }
    return newErrors;
  };

  const handleAadharVerification = async () => {
    const validationErrors = validateAadhar();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setVerificationLoading(true);
    // Simulating Aadhar verification API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Verification successful
      setAadharVerified(true);
      setErrors({});
    } catch (error) {
      setErrors({ general: 'Aadhar verification failed. Please try again.' });
    }
    setVerificationLoading(false);
  };
  return (
    <div className="page-container fade-in">
      <h2><i className="fas fa-user-plus"></i> Register</h2>

      <div className="card">
        {errors.general && (
          <div className="error-message" style={{ marginBottom: '1rem', textAlign: 'center' }}>
            {errors.general}
          </div>
        )}

        {/* Registration Form */}
        <>
            <p className="text-center mb-3" style={{ color: 'var(--text-color)' }}>
              Create your account to find your perfect match
            </p>

            
            <div className="form-group">
              <label><i className="fas fa-user"></i> Full Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.name ? 'error' : ''}
                disabled={!aadharVerified}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label><i className="fas fa-envelope"></i> Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? 'error' : ''}
                disabled={!aadharVerified}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label><i className="fas fa-lock"></i> Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={errors.password ? 'error' : ''}
                disabled={!aadharVerified}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <div className="form-group">
              <label><i className="fas fa-user"></i> Profile Created For:</label>
              <select
                name="profileFor"
                value={formData.profileFor}
                onChange={handleChange}
                className={errors.profileFor ? 'error' : ''}
                disabled={!aadharVerified}
              >
                <option value="">Select Profile Type</option>
                <option value="self">Self</option>
                <option value="son">Son</option>
                <option value="daughter">Daughter</option>
              </select>
              {errors.profileFor && <div className="error-message">{errors.profileFor}</div>}
            </div>

            <div className="form-group">
              <label><i className="fas fa-venus-mars"></i> Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={errors.gender ? 'error' : ''}
                disabled={!aadharVerified}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <div className="error-message">{errors.gender}</div>}
            </div>

            <div className="form-group">
              <label><i className="fas fa-mobile-alt"></i> Mobile Number:</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                className={errors.mobile ? 'error' : ''}
                disabled={!aadharVerified}
              />
              {errors.mobile && <div className="error-message">{errors.mobile}</div>}
            </div>
{/* Aadhar Verification Section */}
            <div style={{
              backgroundColor: '#e8f4f8',
              border: '1px solid #b8e0e8',
              borderRadius: '6px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <h4 style={{ marginTop: 0, marginBottom: '12px', color: '#0056b3' }}>
                <i className="fas fa-id-card"></i> Aadhar Verification
              </h4>

              {aadharVerified && (
                <div style={{
                  backgroundColor: '#d4edda',
                  color: '#155724',
                  padding: '10px 12px',
                  borderRadius: '4px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <i className="fas fa-check-circle"></i>
                  <span>Aadhar verification successful!</span>
                </div>
              )}

              <div className="form-group">
                <label><i className="fas fa-id-card"></i> Aadhar Last 4 Digits:</label>
                <input
                  type="text"
                  name="lastFourDigits"
                  value={aadharData.lastFourDigits}
                  onChange={handleAadharChange}
                  placeholder="Enter last 4 digits of Aadhar"
                  maxLength="4"
                  disabled={aadharVerified}
                  className={errors.lastFourDigits ? 'error' : ''}
                />
                {errors.lastFourDigits && <div className="error-message">{errors.lastFourDigits}</div>}
              </div>

              <div className="form-group">
                <label><i className="fas fa-mobile-alt"></i> Registered Mobile Number:</label>
                <input
                  type="text"
                  name="verificationMobile"
                  value={aadharData.verificationMobile}
                  onChange={handleAadharChange}
                  placeholder="Enter registered mobile number"
                  maxLength="10"
                  disabled={aadharVerified}
                  className={errors.verificationMobile ? 'error' : ''}
                />
                {errors.verificationMobile && <div className="error-message">{errors.verificationMobile}</div>}
              </div>

              {!aadharVerified && (
                <button
                  type="button"
                  onClick={handleAadharVerification}
                  disabled={verificationLoading}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#0056b3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                >
                  {verificationLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Verifying...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i> Verify Aadhar
                    </>
                  )}
                </button>
              )}
            </div>

            {errors.aadhar && (
              <div className="error-message" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                {errors.aadhar}
              </div>
            )}

            <button
              onClick={handleRegister}
              className="btn btn-success"
              style={{ width: '100%', fontSize: '1.1rem' }}
              disabled={loading || !aadharVerified}
            >
              {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-user-plus"></i>}
              {loading ? ' Registering...' : ' Register'}
            </button>
        </>
        

        <div className="text-center mt-3">
          <small style={{ color: 'var(--text-color)', opacity: 0.7 }}>
            <i className="fas fa-shield-alt"></i> Your information is secure and encrypted
          </small>
        </div>
      </div>
    </div>
  );
}