import React, { useState, useEffect } from 'react';
import '../components/MemeTemplate.css';

const MemeTemplate = ({ id, name, source }) => {
  function getId() {
    alert(id);
  }
  return (
    <div className="main" onClick={getId}>
      <div className="memeContainer">
        <h3>{name}</h3>
        <img className="memeImage" src={source} />
      </div>
    </div>
  );
};

export default MemeTemplate;
