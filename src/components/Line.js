export default function Line({ answer, guess, inFinal }) {
  const tiles = [];

  for (let i = 0; i < 5; i++) {
    const char = guess[i];
    let className = "tile";
    if (inFinal) {
      if (char === answer[i]) {
        className += " correct";
      } else if (answer.includes(char)) {
        className += " close";
      } else {
        className += " incorrect";
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
