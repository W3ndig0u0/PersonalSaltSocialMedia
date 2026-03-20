import CreatePost from "../components/createPost";

function CreatePostPage() {
  return (
    <>
      <CreatePost onPostCreated={() => window.location.reload()} />
    </>
  );
}

export default CreatePostPage;