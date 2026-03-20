import { useEffect, useState } from 'react';
import { getUserByUsername, setUserImageByUsername } from '../service/api';
import { useAuth } from '../service/authContext';
import "../style/settings.css";

function Settings() {
  const { logout, user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [urlText, setUrlText] = useState("");

  useEffect(() => {
    getUserByUsername(user?.name).then(userData => {
      setUserData(userData);
    });
  }, [user]);


  const handleCommentSubmit = () => {
    setUserImageByUsername(user?.name, urlText).then(() => {
      setUserData(prevData => ({ ...prevData, imageUrl: urlText }));
      setUrlText("");
      window.location.href = `/`;
    });
  };

  return (
    <div className="settings-page">
      {!user ? (
        <p>You are not logged in.</p>
      ) : (
        <>
          <h1>{user?.name}'s Settings Page</h1>
          <button>Light</button>
          <input
            type="text"
            className="url-input"
            placeholder="Enter image URL..."
            value={urlText}
            onChange={(e) => setUrlText(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Update Profile</button>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Settings;