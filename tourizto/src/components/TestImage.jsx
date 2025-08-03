import React from 'react';

const TestImage = () => {
  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px'
  };

  const containerStyle = {
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 9999,
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    width: '300px'
  };

  return (
    <div style={containerStyle}>
      <h3>Test Images</h3>
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Bada_Ganpati_Temple%2C_Indore.jpg/1200px-Bada_Ganpati_Temple%2C_Indore.jpg" 
        alt="Bada Ganpati Temple" 
        style={imageStyle}
      />
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Khajrana_Ganesh_Temple.jpg/1200px-Khajrana_Ganesh_Temple.jpg" 
        alt="Khajrana Ganesh Temple" 
        style={imageStyle}
      />
      <img 
        src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/cb/f2/a5/devguradia-shiva-mandir.jpg?w=1200&h=-1&s=1" 
        alt="Devguradia Temple" 
        style={imageStyle}
      />
    </div>
  );
};

export default TestImage;
