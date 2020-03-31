import { useState } from "react";

function useMode(initial) {
  const [history, setHistory] = useState([initial]);
  const mode = history[history.length - 1];
  function transition(mode, replace = false) {
    if (!replace) {
      setHistory(prev => [...prev, mode]);
    } else {
      setHistory(prev => [...prev.slice(0, prev.length - 1), mode]);
    }
  }
}
