import { useState } from 'react';
import '../App.css';
import { useAuth } from '../service/authContext';

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      content,
      imageUrl,
      username: user.name
    };

    try {
      const response = await fetch('http://localhost:8080/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        setContent('');
        setImageUrl('');
        if (onPostCreated) onPostCreated();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="post-form-container">
      <form onSubmit={handleSubmit}>
        <h3>Share something, {user.name}!</h3>
        <textarea
          placeholder="Post content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
