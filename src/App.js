import React, { useState, useEffect } from 'react';
import './App.css';
import MemeTemplate from './components/MemeTemplate';
function App() {
  const [memes, setMemes] = useState({});
  const items = [];

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(res => setMemes(res.data.memes));
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
