export default function Line({ answer, guess, inFinal }) {
  const tiles = [];

  for (let i = 0; i < 5; i++) {
    const char = guess[i];
    let className = "tile";
    if (inFinal) {
      console.log("answer!!!!", answer);
      if (char === answer[i]) {
        className += " correct";
        console.log("correct className", className);
      } else if (answer.includes(char)) {
        className += " close";
        console.log("close className", className);
      } else {
        className += " incorrect";
        console.log("incorrect className", className);
      }
    }
    const tile = (
      <div key={i} className={className}>
        {char}
      </div>
    );
    tiles.push(tile);
  }
  return <div className="line">{tiles}</div>;
}
