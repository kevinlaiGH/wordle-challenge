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
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val === null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");

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

      const isLetter =
        event.key.length === 1 &&
        event.key.charCodeAt(0) >= 65 &&
        event.key.charCodeAt(0) <= 122;
      if (isLetter) {
        setCurrentGuess((oldGuess) => oldGuess + event.key);
      }
    };
    window.addEventListener("keydown", handleType);
    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess, isGameOver, answer, guesses]);

  useEffect(() => {
    const fetchWord = async () => {
      const response = await JSON.stringify(wordle);
      const words = await JSON.parse(response);
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setAnswer(randomWord.toLowerCase());
    };
    fetchWord();
  }, []);

  return (
    <div className="board">
      <h1 className="App">Wordle</h1>
      <h1>{JSON.stringify(wordle)}</h1>
      {guesses.map((guess, i) => {
        const isCurrentGuess = i === guesses.findIndex((val) => val == null);
        return (
          <Line
            guess={isCurrentGuess ? currentGuess : guess ?? ""}
            inFinal={!isCurrentGuess && guess !== null}
            answer={answer}
            key={i}
          />
        );
      })}
      {currentGuess}
    </div>
  );
}

export default App;
