import React, { useState, useEffect } from 'react';
import '../components/MemeTemplate.css';

const MemeTemplate = ({ id, name, source }) => {
  async function getId() {
    fetch(
      'https://cors-anywhere.herokuapp.com/https://api.imgflip.com/caption_image',
      {
        method: 'POST',
        body: JSON.stringify({
          'template_id': '231',
          'username': 'imgflip_hubot',
          'password': 'imgflip_hubot',
          'text0': 'sample',
          'text1': 'sampletext'
        })
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
      });
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
