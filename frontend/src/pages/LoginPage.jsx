import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../config';
import '../App.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
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
          text: 'Login successful! Welcome back!' 
        });
        
        // Store user data in localStorage (in production, use proper state management)
        localStorage.setItem('cyberslayers_user', JSON.stringify(data.user));
        
        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setMessage({ 
          type: 'error', 
          text: data.detail || 'Login failed. Please check your credentials.' 
        });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Could not connect to server. Please check your internet connection.' 
      });
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cyber-container bg-gradient-primary auth-container">
      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={20} />
        Back to Home
      </button>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Shield size={32} color="#00bcd4" />
            <span className="auth-logo-text">CyberSlayers</span>
          </div>
          <p className="auth-subtitle">Welcome back, young cyber warrior! 🛡️</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {message.text && (
            <div className={`message-box ${message.type === 'success' ? 'message-success' : 'message-error'}`}>
              {message.type === 'success' ? 
                <CheckCircle size={20} /> : 
                <AlertCircle size={20} />
              }
              {message.text}
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Logging in...
              </>
            ) : (
              'Login & Start Playing! 🎮'
            )}
          </button>
        </form>

        <div className="forgot-password">
          <a href="#" className="auth-link">Forgot your password?</a>
        </div>

        <div className="auth-link-section">
          <p>New to CyberSlayers?{' '}
            <a 
              onClick={() => navigate('/signup')} 
              className="auth-link"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}