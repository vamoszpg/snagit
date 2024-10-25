import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './SnagForm.css';
import { FaCamera, FaFileUpload } from 'react-icons/fa';

const SnagForm = ({ onSubmit, isMobile, totalSnags }) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const categories = ['Bedroom', 'Bathroom', 'Kitchen', 'Living Room', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !title || !description) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    let imageUrl = null;
    if (image) {
      // Simulate image upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      imageUrl = URL.createObjectURL(image);
    }

    onSubmit({ category, title, description, image: imageUrl });
    
    // Reset form fields
    setCategory('');
    setTitle('');
    setDescription('');
    setImage(null);
    setError('');
    setCharCount(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';

    setIsSubmitting(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const triggerCameraInput = () => {
    cameraInputRef.current.click();
  };

  const buttonStyles = {
    base: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderRadius: '5px',
      width: '100%',
      height: '50px',
      fontSize: '24px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: 'white',
      marginBottom: '10px',
    },
    chooseFile: {
      backgroundColor: '#3498db', // Blue
    },
    takePhoto: {
      backgroundColor: '#9b59b6', // Purple
    },
    addSnag: {
      backgroundColor: '#2ecc71', // Green
      padding: '12px 16px',
      fontSize: '16px',
      fontWeight: '600',
      marginTop: '10px',
    },
  };

  const clearForm = () => {
    setCategory('');
    setTitle('');
    setDescription('');
    setImage(null);
    setError('');
    setCharCount(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className={`snag-form ${isMobile ? 'mobile' : ''}`}>
      <div className="form-header">
        <h3>Add New Snag</h3>
        <span className="snag-count">Total Snags: {totalSnags}</span>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="category">Room:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a room</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Bathroom">Bathroom</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Living Room">Living Room</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setCharCount(e.target.value.length);
          }}
          maxLength={500}
          required
        />
        <span className="char-count">{charCount}/500</span>
      </div>
      <div className="form-group">
        <label>Image:</label>
        <button 
          type="button" 
          onClick={triggerFileInput} 
          style={{...buttonStyles.base, ...buttonStyles.chooseFile}}
          title="Choose file"
        >
          <FaFileUpload style={{marginRight: '10px'}} /> Upload Image
        </button>
        <button 
          type="button" 
          onClick={triggerCameraInput} 
          style={{...buttonStyles.base, ...buttonStyles.takePhoto}}
          title="Take photo"
        >
          <FaCamera style={{marginRight: '10px'}} /> Take Photo
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <input
          type="file"
          ref={cameraInputRef}
          onChange={handleImageChange}
          accept="image/*"
          capture="environment"
          style={{ display: 'none' }}
        />
        {image && <p className="file-name">{image.name}</p>}
        {image && (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="Preview" />
          </div>
        )}
        <button 
          type="submit" 
          style={{...buttonStyles.base, ...buttonStyles.addSnag}} 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Snag'}
        </button>
      </div>
    </form>
  );
};

SnagForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  totalSnags: PropTypes.number.isRequired,
};

export default SnagForm;
