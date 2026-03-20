import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostsByUsername, getUserByUsername } from '../service/api';
import { useAuth } from '../service/authContext';
import '../style/profile.css';
import Post from './post';

function UserProfile() {
  const { logout } = useAuth();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  var goToPost = (post) => {
    window.location.href = `/post/${post.id}`;
  };

  useEffect(() => {
    getPostsByUsername(username).then(postsData => {
      setPosts(postsData);
    });

    getUserByUsername(username).then(userData => {
      setUser(userData);
    });
  }, [username]);

  return (
    <div className="profile-center">
      <div className="profile-container">
        {user ? (
          <div >
            <div className="top">
              <h1 className="profile-name">{username}</h1>
              <img className="profile-picture" src={user.imageUrl || 'https://i.pinimg.com/474x/33/f8/26/33f8266681c946cd80de486c499fe992.jpg'} alt="Profile Picture" />
            </div>
            <p className="profile-bio">{user.bio || 'No Bio'}</p>
            <div className="posts">
              <h2>Posts</h2>
              <p>{posts.length} posts</p>
              {posts.map(post => (
                <div className="posts" key={post.id} onClick={() => goToPost(post)}>
                  <Post key={post.id} postId={post.id} />
                </div>
              ))}
            </div>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <p>Please log in to view your profile.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
