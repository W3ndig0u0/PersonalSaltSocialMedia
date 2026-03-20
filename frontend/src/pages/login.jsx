import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../service/authContext';
import '../style/login.css';


function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);

    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found.');
        }
        throw new Error('Incorrect password.');
      }
      const data = await response.text();
      login({ ...data, name: data.username || formData.username });
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>
      <div className="lower-section">
        <p>Don't have an account?</p>
        <li><Link to="/register">Register</Link></li>
      </div>
    </div>
  );
}

export default Login;
