import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({
  posts,
  editTitle,
  editBody,
  setEditTitle,
  setEditBody,
  title,
  setTitle,
  handelEdit,

}) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);


  console.log(title+"  "+setTitle);
  
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post]);

  return (
    <main className="EditPost">
      {post && (
        <>
          <h2>{`Edit post:${title}`}</h2>
          <form
            className="newPostForm"
            onSubmit={(e) => {
              handelEdit(e, id);
            }}
          >
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              id="postTitle"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody"></label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit">Edit</button>
          </form>
        </>
      )}
      {!post && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
