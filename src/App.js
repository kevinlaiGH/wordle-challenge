import "./App.css";
import { useState, useEffect } from "react";
import { wordle } from "./data";
import Line from "./components/Line";

function App() {
  const [answer, setAnswer] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleType = (event) => {
      if (isGameOver) {
        return;
      }
      if (event.key === "Enter") {
        if (currentGuess.length !== 5) {
          return;
        }
        const isCorrect = answer === currentGuess;
        if (isCorrect) {
          setIsGameOver(true);
        }
      }

      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      if (currentGuess.length >= 5) {
        return;
      }

      setCurrentGuess((oldGuess) => oldGuess + event.key);
    };
    window.addEventListener("keydown", handleType);
    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess]);

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
      {guesses.map((guess, i) => {
        const isCurrentGuess = i === guesses.findIndex((val) => val == null);
        return <Line guess={isCurrentGuess ? currentGuess : guess ?? ""} />;
      })}
      {currentGuess}
    </div>
  );
}

export default App;
