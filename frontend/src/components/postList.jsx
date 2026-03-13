import { useEffect, useState } from 'react';
import { useAuth } from '../service/authContext';
import '../style/postingList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const [commentInputs, setCommentInputs] = useState({});

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

  const handleComment = async (id) => {
    if (!user) return alert("Login to comment");
    const text = commentInputs[id];
    if (!text) return;

    const commentWithUser = `${user.name}: ${text}`;

    await fetch(`http://localhost:8080/posts/${id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: commentWithUser,
    });

    setCommentInputs({ ...commentInputs, [id]: '' });

    const res = await fetch('http://localhost:8080/posts/all');
    setPosts(await res.json());
  };

  return (
    <div className="post-list-header">
      {[...posts].reverse().map(p => (
        <div key={p.id}>
          <hr />
          <h4>User: {p.username}</h4>
          <p>{p.content}</p>
          {p.imageUrl && <img src={p.imageUrl} width="200" />}
          <br />
          <button class="like-btn" onClick={() => handleLike(p.id)}>
            Like ({p.likes?.length || 0})
          </button>

          <div className="comments-section">
            {p.comments && p.comments.length > 0 ? (
              p.comments.map((commentString, index) => (
                <div key={index} className="comment">
                  <span>{commentString}</span>
                </div>
              ))
            ) : (
              <p style={{ color: 'gray' }}>No comments yet.</p>
            )}
          </div>

          <input
            type="text"
            placeholder="Add a comment..."
            value={commentInputs[p.id] || ''}
            onChange={(e) => setCommentInputs({ ...commentInputs, [p.id]: e.target.value })}
          />
          <button class="comment-btn" onClick={() => handleComment(p.id)}>Send</button>
        </div>
      ))
      }
    </div >
  );
};

export default PostList;
