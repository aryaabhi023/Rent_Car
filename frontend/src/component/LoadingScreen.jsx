import React from 'react';

export default function LoadingScreen() {
  return (
    <div style={loadingStyle}>
      <img 
        src="https://ik.imagekit.io/abhi023/gifs/icons8-car.gif?updatedAt=1725796812813" 
        alt="Loading..." 
        style={imageStyle}
      />
    </div>
  );
}

const loadingStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  zIndex: 9999,
};

const imageStyle = {
  width: '100px',
  height: '100px',
};
