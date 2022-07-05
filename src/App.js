import "./App.css";
import { useState, useEffect } from "react";
import { wordle } from "./data";
import Line from "./components/Line";

function App() {
  const [answer, setAnswer] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));

  useEffect(() => {
    const fetchWord = async () => {
      const response = await JSON.stringify(wordle);
      const words = await JSON.parse(response);
      const randomWord = words[Math.floor(Math.random())];
      setAnswer(randomWord);
    };
    fetchWord();
  }, []);

  return (
    <div className="board">
      <h1 className="App">Wordle</h1>
      {/* <h1>{answer}</h1> */}
      {guesses.map((guess) => {
        return <Line guess={guess ?? ""} />;
      })}
    </div>
  );
}

export default App;
