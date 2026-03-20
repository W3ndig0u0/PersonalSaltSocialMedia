import { useEffect, useState } from 'react';
import Post from '../pages/post';
import { getAllPost } from '../service/api';
import '../style/postingList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  var goToPost = (post) => {
    window.location.href = `/post/${post.id}`;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        getAllPost().then(postsData => {
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
      {[...posts].reverse().map(p => {
        console.log(p);
        return (
          <div className="posts" key={p.id} onClick={() => goToPost(p)}>
            <Post key={p.id} postId={p.id} />
          </div>
        );
      })}
    </div >
  );
};

export default PostList;
