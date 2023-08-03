import "./App.css";
import LoginPage from "./components/LoginPage";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import AppPage from "./components/AppPage";
import { UserContextProvider } from "./UserContext";
import CreateBlog from "./components/CreateBlog";
import BlogPage from "./components/BlogPage";
import EditPage from "./components/EditPage";

export default function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Routes>
          <Route index path="/" element={<AppPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/create" element={<CreateBlog />}></Route>
          <Route path="/post/:id" element={<BlogPage />}></Route>
          <Route path="/edit/:id" element={<EditPage />}></Route>
        </Routes>
      </div>
    </UserContextProvider>
  );
}
