import { Link } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../service/authContext';
import '../style/header.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {user ? (
          <li>
            <span>Welcome, <strong>{user.name}</strong>!</span>
            <button onClick={logout}>Logout</button>
          </li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
