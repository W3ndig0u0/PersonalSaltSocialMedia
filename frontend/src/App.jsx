import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import CreatePostPage from "./pages/createPost";
import Home from "./pages/home";
import Login from "./pages/login";
import Post from "./pages/post";
import Register from "./pages/register";
import Settings from "./pages/settings";
import UserProfile from "./pages/userProfile";
import { AuthProvider } from "./service/authProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/:username" element={<UserProfile />} />
            <Route path="/post/:postId" element={<Post />} />
            <Route path="/create-post" element={<CreatePostPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
