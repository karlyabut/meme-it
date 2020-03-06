import React, { useState, useEffect } from "react";
import "../components/MemeTemplate.css";
import axios from "axios";

const MemeTemplate = ({ id, name, source }) => {
  const headers = {
    "X-Requested-With": "application/x-www-form-urlencoded"
  };
  function getId() {
    const createMemeObj = {
      template_id: id,
      username: "",
      password: "@r",
      text0: "sample",
      text1: "sampletext"
    };
    const params = Object.keys(createMemeObj)
      .map(key => {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(createMemeObj[key])
        );
      })
      .join("&");
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://api.imgflip.com/caption_image",
        params,
        { headers: headers }
      )
      .then(res => {
        console.log(res);
      });
    // fetch(
    //   "https://cors-anywhere.herokuapp.com/https://api.imgflip.com/caption_image",
    //   {
    //     method: "POST",
    //     headers: {
    //       "X-Requested-With": "application/json"
    //     },
    //     body: {
    //       template_id: id,
    //       username: "imgflip_hubot",
    //       password: "imgflip_hubot",
    //       text0: "sample",
    //       text1: "sampletext"
    //     }
    //   }
    // )
    //   .then(res => {
    //     return res.json();
    //     // console.log(res.body);
    //   })
    //   .then(data => {
    //     console.log(data);
    //   });
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
