import React, { useState, useEffect } from "react";
import "../components/MemeTemplate.css";
import axios from "axios";
import Modal from "react-modal";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";

const MemeTemplate = ({ id, name, source }) => {
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");
  const [memeImage, setMemeImage] = useState();
  const [isShowingMemeModal, setIsShowingMemeModal] = useState(false);

  function openMemeModal() {
    setIsShowingMemeModal(true);
  }
  function closeMemeModal() {
    setIsShowingMemeModal(false);
  }
  const headers = {
    "X-Requested-With": "application/x-www-form-urlencoded"
  };
  function getId() {
    const createMemeObj = {
      template_id: id,
      username: process.env.REACT_APP_IMGFLIP_USERNAME,
      password: process.env.REACT_APP_IMGFLIP_PASSWORD,
      text0: firstText,
      text1: secondText
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
        setMemeImage(res.data.data.url);
      });
  }
  return (
    <div className="main">
      <button onClick={openMemeModal} />
      <Modal
        isOpen={isShowingMemeModal}
        onRequestClose={closeMemeModal}
        contentLabel={"meme"}
      >
        <div className="memeContainer">
          <h3>{name}</h3>
          <img className="memeImage" src={source} />
          <input
            onChange={e => {
              setFirstText(e.target.value);
            }}
          />
          <input
            onChange={e => {
              setSecondText(e.target.value);
            }}
          />
          <button onClick={getId}>submit</button>
          <img src={memeImage} />
          <FacebookShareButton url={memeImage}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={memeImage}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <RedditShareButton url={memeImage}>
            <RedditIcon size={32} round />
          </RedditShareButton>
          <WhatsappShareButton url={memeImage}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </Modal>
    </div>
  );
};

export default MemeTemplate;
