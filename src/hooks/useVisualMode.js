import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setHistory(prev => {
      // If replace is true, replace the current mode in history
      // Otherwise, add it normally as a new mode in history
      if (replace) {
        prev = prev.slice(0, prev.length - 1);
      }
      return [...prev, newMode];
    })
    setMode(newMode);
  }

  function back() {
    if (history.length === 1) return;
    const newHistory = history.slice(0, history.length - 1);
    setHistory([...newHistory]);
    setMode(history[history.length - 2]);
  }

  return { mode, transition, back }
}