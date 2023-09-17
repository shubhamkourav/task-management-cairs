import React from 'react';
import './loader.css'; // Import the CSS styles for the loader component using single quotes

// Define the Loader component, which displays a loading animation
export const Loader = () => (
  <div className="showbox"> {/* Create a container with the "showbox" class */}
    <div className="loader"> {/* Create a loader container with the "loader" class */}
      <svg className="circular" viewBox="25 25 50 50"> {/* Create an SVG element for the circular loader */}
        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" /> {/* Create a circle element with animation properties */}
      </svg>
    </div>
  </div>
);
