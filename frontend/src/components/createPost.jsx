import { useState } from 'react';
import { useAuth } from '../service/authContext';
import '../style/createPost.css';

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
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <h3>Create Post</h3>
      </div>
      <form className="post-form" onSubmit={handleSubmit}>
        <textarea
          className="post-input post-textarea"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="post-footer">
          <input
            className="post-input post-url"
            type="text"
            placeholder="Add an image URL..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button className="post-button" type="submit">Post</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
