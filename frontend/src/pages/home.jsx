import CreatePost from "../components/CreatePost";
import PostList from "../components/postList";

function Home() {
  return (
    <div className="feed-container">
      <CreatePost onPostCreated={() => window.location.reload()} />
      <PostList />
    </div>

  )
}

export default Home;

