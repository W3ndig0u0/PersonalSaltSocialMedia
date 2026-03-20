import { Link } from 'react-router-dom';
import { useAuth } from '../service/authContext';
import '../style/footer.css';

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer className="footer">
      <ul>
        <li className="footer-user-actions">
          <Link to="/search">Search</Link>
          <Link to="/create-post">Create Post</Link>
          <Link to={`/user/${user?.name}`}>Profile</Link>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </footer >
  );
};

export default Footer;
