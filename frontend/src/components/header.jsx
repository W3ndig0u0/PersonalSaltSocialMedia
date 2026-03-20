import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserImageByUsername } from '../service/api';
import { useAuth } from '../service/authContext';
import '../style/header.css';

const Header = () => {
  const { user } = useAuth();
  const defaultImageUrl = 'https://i.pinimg.com/474x/33/f8/26/33f8266681c946cd80de486c499fe992.jpg';
  const [pfp, setPfp] = useState(defaultImageUrl);

  useEffect(() => {
    const loadData = async () => {
      try {
        getUserImageByUsername(user?.name).then((data) => {
          setPfp(data?.imageUrl);
        })
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, [user]);

  return (
    <nav>
      <ul>
        <Link to="/">
          <img className="logo" src="/favicon.svg" alt="logo" />
        </Link>
        <li><Link to="/">Home</Link></li>
        {user ? (
          <li>
            <Link to={`/user/${user.name}`}>
              <img className="profile-img" src={pfp || defaultImageUrl} alt="pfp" />
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login"><button>Login</button></Link>
            </li>
          </>
        )}
      </ul>
    </nav >
  );
};

export default Header;
