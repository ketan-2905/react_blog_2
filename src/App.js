import './index.css'
import axios from 'axios';
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/PostPage";
import About from "./pages/About";
import Missing from "./pages/Missing";
import { Route, useNavigate, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';
import EditPost from './pages/EditPost';

import useWindoSize from './hooks/usewindoSize';



function App() {
  const windoSize = useWindoSize()
  const ketan = "Ketan"

  
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('posts')) || [])
  const [searchPost, setSearchPost] = useState('')
  const [searchPostResult, setSearchPostResult] = useState([])

  const location = useLocation();
  const navigate = useNavigate();

  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [title, setTitle] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')

  useEffect(() => {
    localStorage.setItem('posts' , JSON.stringify(posts))
  },[posts])


  useEffect(() => {
    const filterPost = posts.filter((post) => 
      post.title.toLowerCase().includes(searchPost.toLowerCase()) || 
      post.body.toLowerCase().includes(searchPost.toLowerCase())
    );
    setSearchPostResult(filterPost.reverse());
  }, [posts, searchPost]);

  const handleDelete = (id) => {
      const newPosts = posts.filter((post) => post.id !== id)
      setPosts(newPosts);
      navigate('/');
      localStorage.setItem('posts' , JSON.stringify(posts))
  };

  const handelEdit = async (e, id) => {
    e.preventDefault();
    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime: dateTime, body: editBody };
    const newPosts = posts.map((post) => post.id === id ? updatedPost : post);
    setPosts(newPosts);
    setEditTitle('');
    setEditBody('');
    setTitle('');
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? (parseInt(posts[posts.length - 1].id) + 1).toString() : "1";
    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime: dateTime, body: postBody };
    setPosts([...posts, newPost]);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  };

  return (
    <div className="App">
      <Header windoSize={windoSize} />
      <Nav 
        searchPost={searchPost} 
        setSearchPost={setSearchPost}
        location={location}
      />
      <Routes>
        <Route path="/" element={<Home posts={searchPostResult} />} />
        <Route 
          path="/post/edit/:id" 
          element={
            <EditPost
              posts={posts}
              editTitle={editTitle}
              editBody={editBody}
              setEditTitle={setEditTitle} 
              setEditBody={setEditBody}
              title={title}
              setTitle={setTitle}
              handelEdit={handelEdit}
            />
          } 
        />
        <Route 
          path="/post" 
          element={
            <NewPost 
              postTitle={postTitle}
              postBody={postBody}
              setPostTitle={setPostTitle} 
              setPostBody={setPostBody}
              handleSubmit={handleSubmit}
            />
          } 
        />
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
