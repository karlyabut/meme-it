import React, { useState, useEffect } from "react";
import "./App.css";
import MemeTemplate from "./components/MemeTemplate";
import axios from "axios";
function App() {
  const [memes, setMemes] = useState({});
  const items = [];
  useEffect(() => {
    axios.get("https://api.imgflip.com/get_memes").then(res => {
      setMemes(res.data.data.memes);
    });
  }, []);
  for (let i in memes) {
    console.log(memes[i]);
    items.push(
      <MemeTemplate
        key={i}
        id={memes[i].id}
        name={memes[i].name}
        source={memes[i].url}
      />
    );
  }
  return (
    <div className="App">
      <div className="pageTitle">
        <h1 className="bannerTxt">Meme-it!</h1>
        <p>
          Choose a template to use for your meme! NOTE: you can only make the
          memes that requires two text boxes :(
        </p>
      </div>
      {items}
    </div>
  );
}

export default App;
