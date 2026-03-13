import { useEffect, useState } from 'react';
import { useAuth } from '../service/authContext';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('http://localhost:8080/posts/all');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  const handleLike = async (id) => {
    await fetch(`http://localhost:8080/posts/${id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user.name }),
    });
    const loadData = async () => {
      try {
        const res = await fetch('http://localhost:8080/posts/all');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  };

  return (
    <main>
      {[...posts].reverse().posts.map(p => (
        <div key={p.id}>
          <hr />
          <h4>User: {p.username}</h4>
          <p>{p.content}</p>
          {p.imageUrl && <img src={p.imageUrl} width="200" />}
          <br />
          <button onClick={() => handleLike(p.id)}>
            Like ({p.likes?.length || 0})
          </button>
        </div>
      ))}
    </main>
  );
};

export default PostList;
