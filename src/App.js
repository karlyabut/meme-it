import React, { useState, useEffect } from "react";
import "./App.css";
import MemeTemplate from "./components/MemeTemplate";
import Pagination from "./components/Pagination";
import axios from "axios";
function App() {
  const [memes, setMemes] = useState([]);

  //set up pagination
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [memesPerPage, setMemesPerPage] = useState(10);
  const items = [];
  const searchMemes = [];

  useEffect(() => {
    setLoading(true);
    axios.get("https://api.imgflip.com/get_memes").then(res => {
      setMemes(res.data.data.memes);
    });
    setLoading(false);
  }, []);

  const indexOfLastMeme = currentPage * memesPerPage;
  const indexOfFirstMeme = indexOfLastMeme - memesPerPage;
  const currentMemes = memes.slice(indexOfFirstMeme, indexOfLastMeme);

  for (let i in currentMemes) {
    searchMemes.push(memes[i].name);
    items.push(
      <MemeTemplate
        key={i}
        id={currentMemes[i].id}
        name={currentMemes[i].name}
        source={currentMemes[i].url}
        loading={loading}
      />
    );
  }
  console.log(searchMemes);
  //changing page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  //get current memes
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
      <Pagination
        currentPage={currentPage}
        memesPerPage={memesPerPage}
        totalMemes={memes.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
