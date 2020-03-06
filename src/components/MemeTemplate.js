import React, { useState, useEffect } from "react";
import "../components/MemeTemplate.css";
import axios from "axios";

const MemeTemplate = ({ id, name, source }) => {
  const headers = { "Content-Type": "multipart/form-data" };
  function getId() {
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://api.imgflip.com/caption_image",
        {
          template_id: "1232",
          username: "imgflip_hubot",
          password: "imgflip_hubot",
          text0: "sample",
          text1: "sampletext"
        },
        { headers: headers }
      )
      .then(res => {
        console.log(res);
      });
    // fetch(
    //   'https://cors-anywhere.herokuapp.com/https://api.imgflip.com/caption_image',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body: {
    //       template_id: id,
    //       username: 'imgflip_hubot',
    //       password: 'imgflip_hubot',
    //       text0: 'sample',
    //       text1: 'sampletext'
    //     }
    //   }
    // ).then(res => {
    //   res.json();
    //   console.log(res.body);
    // });
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
