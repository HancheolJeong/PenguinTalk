import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const MyForm = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert text and image to XML
    const xmlData = `
      <data>
        <text>${text}</text>
        <image>${image.name}</image>
      </data>
    `;

    // Create FormData to send text and image as files
    const formData = new FormData();
    formData.append('xmlData', new Blob([xmlData], { type: 'application/xml' }));
    formData.append('image', image);

    // Send POST request to the server
    try {
      const response = await axios.post('your-server-endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response, e.g., show success message
      console.log('Response:', response.data);

      // Open the modal after successful submission
      setModalIsOpen(true);
    } catch (error) {
      // Handle errors, e.g., show error message
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* ... (same form content as before) */}
        <button type="submit">Submit</button>
      </form>

      {/* Modal for displaying success message */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Submission Successful</h2>
        <p>Your data has been submitted successfully.</p>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default MyForm;