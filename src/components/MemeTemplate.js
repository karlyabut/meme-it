import React, { useState, useEffect } from "react";
import "../components/MemeTemplate.css";
import axios from "axios";
import Modal from "react-modal";
import ClipLoader from "react-spinners/ClipLoader";
import { CopyToClipboard } from "react-copy-to-clipboard";
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
  const [isLoading, setIsLoading] = useState(false);

  function openMemeModal() {
    setMemeImage(source); //set image source back to template image
    setShowMemeForm(true);
    setShowSharing(false);
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
    setIsLoading(true);
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://api.imgflip.com/caption_image",
        params,
        { headers: headers }
      )
      .then(res => {
        setIsLoading(false);
        setShowSharing(true);
        setShowMemeForm(false);
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
          <div
            className="memeForm"
            style={{ display: showMemeForm ? "block" : "none" }}
          >
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
            <div className="btnContainer">
              <button
                className="spacer pickBtn"
                onClick={getId}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ClipLoader size={10} color={"#ffffff"} loading={isLoading} />
                ) : (
                  "meme-it"
                )}
              </button>
              <button
                className="closeBtn"
                onClick={closeMemeModal}
                style={{ display: isLoading ? "none" : "in-line" }}
              >
                forget-it
              </button>
            </div>
          </div>
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
              <p>{memeImage}</p>
              <CopyToClipboard text={memeImage}>
                <button>Copy to clipboard</button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MemeTemplate;
