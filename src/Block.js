import "./App.css"
import React from 'react';

function Block({ filled, character }) {
    return (
        <div className={`block ${filled ? 'filled' : ''}`}>
          {character}
        </div>
      );
    
}

export default Block;
