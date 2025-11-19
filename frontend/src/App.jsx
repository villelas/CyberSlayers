import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import GameDashboard from './pages/GameDashboard';
import AboutUs from './pages/AboutUs';
import Password_Security_Game from './pages/password_security_game.jsx';
import Phishing_Detection_Game from './pages/phishing_detection_game.jsx';
import Malware_Analysis_Lab from './pages/malware_analysis_lab.jsx';
import Network_Command_Center from './pages/network_command_center.jsx';
import Lessons from './pages/Lessons.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<GameDashboard />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/games" element={<GameDashboard />} />
          <Route path="/password-security-core" element={<Password_Security_Game />} />
          <Route path="/phishing-detection-hub" element={<Phishing_Detection_Game />} />
          <Route path="/malware-analysis-lab" element={<Malware_Analysis_Lab />} />
          <Route path="/network-command-center" element={<Network_Command_Center />} />
          <Route path="/lessons" element={<Lessons />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;