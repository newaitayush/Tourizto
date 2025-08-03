import React from 'react';

// Use public folder for images
const rajwadaImg = '/images/RajwadaPalace.jpg';
const lalbaghImg = '/images/Lal-Bagh-Palace.jpg';
const sarafaImg = '/images/sarafa.jpg';

const ImageTest = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Image Test Component</h1>
      <p>Testing direct image imports:</p>

      <div style={{ marginBottom: '20px' }}>
        <h2>Rajwada Palace</h2>
        <img
          src={rajwadaImg}
          alt="Rajwada Palace"
          style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Lal Bagh Palace</h2>
        <img
          src={lalbaghImg}
          alt="Lal Bagh Palace"
          style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Sarafa Bazaar</h2>
        <img
          src={sarafaImg}
          alt="Sarafa Bazaar"
          style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Direct Path Test</h2>
        <img
          src="/src/images/RajwadaPalace.jpg"
          alt="Rajwada Palace (Direct Path)"
          style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default ImageTest;
