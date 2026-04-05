import { useEffect, useState } from "react";
import Post from "../pages/post";
import { getAllPost } from "../service/api";
import "../style/postingList.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  var goToPost = (post) => {
    window.location.href = `/post/${post.id}`;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        getAllPost().then((postsData) => {
          setPosts(postsData);
        });
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  return (
    <div className="post-list">
      {posts && posts.length > 0 ? (
        [...posts].reverse().map((p) => (
          <div className="posts" key={p.id} onClick={() => goToPost(p)}>
            <Post data={p} />
          </div>
        ))
      ) : (
        <div className="no-posts">
          <p>No posts yet. Be the first to share something!</p>
        </div>
      )}
    </div>
  );
};

export default PostList;
