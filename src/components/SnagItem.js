import React from 'react';
import './SnagItem.css';

const SnagItem = ({ snag, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this snag?')) {
      onDelete(snag.id);
    }
  };

  return (
    <div className="snag-item">
      {snag.image && <img src={snag.image} alt={snag.title} className="snag-image" />}
      <h3>{snag.title}</h3>
      <p>{snag.description}</p>
      <p className="category">Category: {snag.category}</p>
      <p className="date">Date: {new Date(snag.date).toLocaleDateString()}</p>
      <button onClick={handleDelete} className="delete-button">Delete</button>
    </div>
  );
};

export default SnagItem;
