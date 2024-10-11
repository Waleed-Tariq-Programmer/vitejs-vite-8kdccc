import React, { useState } from 'react';
import { FaRegHeart, FaRegComment } from 'react-icons/fa';
import './PostCard.css';
import Comment from './Comment'; // Import the Comment component

export default function PostCard({ name, date, profile, post, content, likeCount, commentCount, createdAt }) {
  const [showComments, setShowComments] = useState(false); // State to toggle comments section

  const toggleComments = () => {
    console.log("Toggling comments. Current state:", showComments); // Log the current state
    setShowComments(!showComments); // Toggle comment section on click
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="avatar">
          <img src={profile} alt="Avatar" className="avatar-image" />
        </div>
        <div className="header-info">
          <h3 className="user-name">{name}</h3>
          <span className="date">{date}</span>
          <span className="date">{createdAt}</span>
        </div>
      </div>
      
      <div className="card-content">
        <div className="image-container">
          <img src={post} alt="Post" className="post-image" />
        </div>
        <p className="post-description">{content}</p>
      </div>
      
      <div className="card-footer">
        <div className="footer-buttons">
          <button className="footer-button">
            <FaRegHeart className="icon" />
            <span className="count">{likeCount}</span> {/* Like count */}
          </button>
          <button className="footer-button" onClick={toggleComments}>
            <FaRegComment className="icon" />
            <span className="count">{commentCount}</span> {/* Comment count */}
          </button>
        </div>
      </div>
      
      {/* Show Comment component if showComments is true */}
      {showComments && <Comment />}
    </div>
  );
}
