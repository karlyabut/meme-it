import React, { useState, useEffect } from 'react';
import '../components/MemeTemplate.css';

const MemeTemplate = ({ name, source }) => {
  return (
    <div className="main">
      <div className="memeContainer">
        <h3>{name}</h3>
        <img className="memeImage" src={source} />
      </div>
    </div>
  );
};

export default MemeTemplate;
