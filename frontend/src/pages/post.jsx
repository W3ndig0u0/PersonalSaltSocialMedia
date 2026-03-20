import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { commentOnPost, getPostById } from '../service/api';

function Post({ postId }) {
  const postParam = useParams();
  const [commentText, setCommentText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!postId) {
    postId = postParam;
  }

  const [post, setPosts] = useState({});

  const getPostData = async (postId) => {
    try {
      if (postId.postId) {
        getPostById(postId.postId).then(postData => {
          setPosts(postData);
        });
        return;
      }
      getPostById(postId).then(postData => {
        setPosts(postData);
      });
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const loadData = async () => {
      getPostData(postId);
    };

    loadData();
  }, [postId]);

  const handleCommentSubmit = () => {
    commentOnPost(postId.postId || postId, user.name, commentText).then(() => {
      getPostData(postId);
      setCommentText("");
    });
  };

  const handleLike = async (post) => {
    console.log(user.name);
    await fetch(`http://localhost:8080/posts/${post.id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user.name }),
    });
    getPostData(postId);
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return "just now";

    const postDate = new Date(dateString);
    const timeNow = new Date();
    const diffInMs = timeNow - postDate;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds > 0 ? seconds : 0}s`;
  };


  return (
    <div className="post-list">
      <div className="post">
        <div className="post-flex">
          <div className="left">
            <a href={`/user/${post.username}`}>
              <img className="profile-pic" src={post.user?.imageUrl || "https://i.pinimg.com/474x/33/f8/26/33f8266681c946cd80de486c499fe992.jpg"} alt="profile picture" />
            </a>
          </div>
          <div className="right">
            <div className="profile-info-top">
              <a className="post-user" href={`/user/${post.username}`}>
                {post.username}
              </a>
              <p className="timeago">{getTimeAgo(post.createdAt)}</p>
            </div>
            <p className="post-content">{post.content}</p>
            {post.imageUrl && <img className="post-image" src={post.imageUrl} alt="Post image" />}
            <div className="detail">
              <span className="like-amount amount" onClick={
                () => handleLike(post)
              } >
                ❤️ {post.likes?.length || 0}
              </span>
              <span className="comment-amount amount"
              > 🗣️ {post.comments?.length || 0}</span>
            </div>
          </div>
        </div>
        {window.location.pathname.includes("/post/") && (
          <div className="comment-field">
            <div className="comments">
              {post.comments?.map((comment, index) => (
                <div key={index} className="comment">
                  <div className="comment-top">
                    <a href={`/user/${comment.poster.username}`}>
                      <img className="profile-pic" src={comment.poster?.imageUrl || "https://i.pinimg.com/474x/33/f8/26/33f8266681c946cd80de486c499fe992.jpg"} alt="profile picture" />
                    </a>
                    <a className="post-user" href={`/user/${comment.poster.username}`}>
                      {comment.poster.username}
                    </a>
                    <p className="timeago">{getTimeAgo(comment.createdAt)}</p>
                  </div>
                  <div className="comment-content">
                    <p>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="addComment">
              <input
                type="text"
                className="comment-input"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button onClick={handleCommentSubmit}>Comment</button>
            </div>
          </div>
        )}
      </div >
    </div >
  )
};

export default Post;
