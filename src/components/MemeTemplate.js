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
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon
} from "react-share";

const MemeTemplate = ({ id, name, source }) => {
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");
  const [memeImage, setMemeImage] = useState();
  const [isShowingMemeModal, setIsShowingMemeModal] = useState(false);
  const [showMemeForm, setShowMemeForm] = useState(true);
  const [showSharing, setShowSharing] = useState(false);

  function openMemeModal() {
    setMemeImage(source); //set image source back to template image
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
        setShowSharing(true);
        setMemeImage(res.data.data.url);
      });
  }
  return (
    <div className="template">
      <div className="memeContainer">
        <h3 className="templateName">{name}</h3>
        <img className="memeImage" src={source} />
      </div>
      <button className="spacer pickBtn" onClick={openMemeModal}>
        This one!
      </button>
      <Modal
        isOpen={isShowingMemeModal}
        onRequestClose={closeMemeModal}
        contentLabel={"meme"}
        style={{ content: { background: "#0b0c10" } }}
      >
        <div className="memeContainer insideModal">
          <h3 className="templateName">{name}</h3>
          <img className="memeImage spacer" src={memeImage} />
          <input
            placeholder="top/left text"
            className="memeInput spacer"
            onChange={e => {
              setFirstText(e.target.value);
            }}
          />
          <input
            placeholder="bottom/right text"
            className="memeInput spacer"
            onChange={e => {
              setSecondText(e.target.value);
            }}
          />
          <button className="spacer pickBtn" onClick={getId}>
            meme-it
          </button>
          <button className="closeBtn" onClick={closeMemeModal}>
            forget-it
          </button>
          <div
            className="sharingContainer"
            style={{ display: showSharing ? "block" : "none" }}
          >
            <p>Share your meme!</p>
            <div className="shareBtnContainer">
              <FacebookShareButton className="shareBtn" url={memeImage}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <FacebookMessengerShareButton
                className="shareBtn"
                url={memeImage}
              >
                <FacebookMessengerIcon size={32} round />
              </FacebookMessengerShareButton>
              <TwitterShareButton className="shareBtn" url={memeImage}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <RedditShareButton className="shareBtn" url={memeImage}>
                <RedditIcon size={32} round />
              </RedditShareButton>
              <WhatsappShareButton className="shareBtn" url={memeImage}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MemeTemplate;
