import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../config';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear message when user starts typing
    if (message.text) setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match!' });
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long!' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(API_ENDPOINTS.SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: 'Account created successfully! Redirecting to login...' 
        });
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage({ 
          type: 'error', 
          text: data.detail || 'Sign up failed. Please try again.' 
        });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Could not connect to server. Please check your internet connection.' 
      });
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    },
    backButton: {
      position: 'absolute',
      top: '2rem',
      left: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'rgba(0, 0, 0, 0.3)',
      border: 'none',
      color: 'white',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)'
    },
    signupCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      border: '1px solid rgba(0, 188, 212, 0.3)',
      padding: '3rem',
      width: '100%',
      maxWidth: '450px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    logoText: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #00bcd4, #9c27b0)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      color: '#cccccc',
      fontSize: '1rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.9rem',
      fontWeight: 'bold',
      color: '#00bcd4'
    },
    inputContainer: {
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      color: 'white',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box'
    },
    passwordToggle: {
      position: 'absolute',
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#999',
      cursor: 'pointer',
      transition: 'color 0.3s ease'
    },
    signupButton: {
      padding: '1rem',
      background: loading ? 'rgba(0, 188, 212, 0.5)' : 'linear-gradient(45deg, #00bcd4, #2196f3)',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'transform 0.3s ease',
      boxShadow: '0 10px 30px rgba(0, 188, 212, 0.3)',
      marginTop: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    message: {
      padding: '1rem',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    successMessage: {
      background: 'rgba(76, 175, 80, 0.2)',
      border: '1px solid rgba(76, 175, 80, 0.5)',
      color: '#4caf50'
    },
    errorMessage: {
      background: 'rgba(244, 67, 54, 0.2)',
      border: '1px solid rgba(244, 67, 54, 0.5)',
      color: '#f44336'
    },
    loginSection: {
      textAlign: 'center',
      marginTop: '2rem',
      paddingTop: '1rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#cccccc'
    },
    link: {
      color: '#9c27b0',
      textDecoration: 'none',
      fontSize: '0.9rem',
      cursor: 'pointer'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid transparent',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.backButton}
        onClick={() => navigate('/')}
        onMouseEnter={(e) => e.target.style.background = 'rgba(0, 188, 212, 0.2)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.3)'}
      >
        <ArrowLeft size={20} />
        Back to Home
      </button>

      <div style={styles.signupCard}>
        <div style={styles.header}>
          <div style={styles.logo}>
            <Shield size={32} color="#00bcd4" />
            <span style={styles.logoText}>CyberSlayers</span>
          </div>
          <p style={styles.subtitle}>Join the cyber warriors! Create your account 🛡️</p>
        </div>

        {message.text && (
          <div style={{
            ...styles.message,
            ...(message.type === 'success' ? styles.successMessage : styles.errorMessage)
          }}>
            {message.type === 'success' ? 
              <CheckCircle size={20} /> : 
              <AlertCircle size={20} />
            }
            {message.text}
          </div>
        )}

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="Enter your email"
              required
              disabled={loading}
              onFocus={(e) => e.target.style.borderColor = '#00bcd4'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Create a password (min 6 characters)"
                required
                disabled={loading}
                minLength={6}
                onFocus={(e) => e.target.style.borderColor = '#00bcd4'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
              />
              <button
                type="button"
                style={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                onMouseEnter={(e) => e.target.style.color = '#00bcd4'}
                onMouseLeave={(e) => e.target.style.color = '#999'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="Confirm your password"
              required
              disabled={loading}
              onFocus={(e) => e.target.style.borderColor = '#00bcd4'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
            />
          </div>

          <button 
            type="submit"
            style={styles.signupButton}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.transform = 'scale(1)';
            }}
          >
            {loading ? (
              <>
                <div style={styles.spinner}></div>
                Creating Account...
              </>
            ) : (
              'Create Account & Join! 🚀'
            )}
          </button>
        </form>

        <div style={styles.loginSection}>
          <p>Already have an account?{' '}
            <a 
              onClick={() => navigate('/login')} 
              style={styles.link}
            >
              Login here
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}