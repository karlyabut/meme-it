import React, { useState, useEffect } from 'react';
import '../components/MemeTemplate.css';
import { createProxyMiddleware } from 'http-proxy-middleware';

const MemeTemplate = ({ id, name, source }) => {
  const apiProxy = createProxyMiddleware(
    'https://api.imgflip.com/caption_image'
  );
  async function getId() {
    fetch(apiProxy, {
      method: 'POST',
      mode: 'cors', //figure out cors error and proxying
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        template_id: id,
        username: 'imgflip_hubot',
        password: 'imgflip_hubot',
        text0: 'sample',
        text1: 'sampletext'
      })
    }).then(res => {
      console.log(res);
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
