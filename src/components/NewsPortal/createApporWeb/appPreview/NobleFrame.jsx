import React from 'react';
import './NobelFrame.css';

const NobleFrame = ({ children, width = 330, height = 700, color = 'black' }) => {
  // Color variants
  const colorStyles = {
    black: {
      frameColor: '#1a1a1a',
      bezelColor: '#0d0d0d',
      metalColor: '#333333',
    },
    silver: {
      frameColor: '#e4e4e4',
      bezelColor: '#f0f0f0',
      metalColor: '#d9d9d9',
    },
    gold: {
      frameColor: '#f5e7c6',
      bezelColor: '#f8edd1',
      metalColor: '#e6c88c',
    },
  };

  const colors = colorStyles[color] || colorStyles.black;

  return (
    <div className="realistic-mobile-frame" style={{ 
      '--frame-color': colors.frameColor,
      '--bezel-color': colors.bezelColor,
      '--metal-color': colors.metalColor,
      width: `${width}px`, 
      height: `${height}px` 
    }}>
      {/* Frame decorations */}
      <div className="frame-decoration">
        <div className="camera-notch">
          <div className="front-camera"></div>
          <div className="speaker"></div>
          <div className="sensor"></div>
        </div>
        <div className="volume-buttons">
          <div className="volume-up"></div>
          <div className="volume-down"></div>
        </div>
        <div className="power-button"></div>
        <div className="home-indicator"></div>
        <div className="bottom-speaker"></div>
        <div className="frame-reflections"></div>
      </div>
      
      {/* Screen area */}
      <div className="screen-container">
        <div className="screen-glass-effect"></div>
        <div className="screen-content">
          {children || (
            <div className="default-preview">
              <h2>Your App Preview</h2>
              <p>Place your components inside this frame</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NobleFrame;