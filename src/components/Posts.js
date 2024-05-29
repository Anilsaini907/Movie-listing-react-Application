import React, { useEffect, useState } from "react";



const Posts = ({ posts, loading , addFavorite }) => {
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {posts.map((post) => {
          return (
            <div className="col-md-4 mb-4" key={post.id} >
              <div className="card">
                <div className="card-body" style={{height: '250px'}}>
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                      className="embed-responsive-item"
                      src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.body}</p>
                </div>
                <button onClick={() => addFavorite(post)}  className="btn btn-primary">{'Add to Favorites'}</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
