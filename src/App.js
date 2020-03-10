import React, { useState, useEffect } from "react";
import "./App.css";
import MemeTemplate from "./components/MemeTemplate";
import axios from "axios";
function App() {
  const [memes, setMemes] = useState({});
  const items = [];
  console.log(process.env.REACT_APP_IMGFLIP_USERNAME);
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
      {items}
      {/* <button onClick={() => <MemeTemplate />}>whe</button> */}
    </div>
  );
}

export default App;
