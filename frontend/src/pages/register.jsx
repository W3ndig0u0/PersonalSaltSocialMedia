import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../service/authContext';
import '../style/login.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.text();
        login({ ...data, name: data.username || formData.username });
        navigate('/');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="login">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
      <div className="lower-section">
        <p>Already have an account?</p>
        <li><Link to="/login">Login</Link></li>
      </div>
    </div>
  );
}

export default Register;