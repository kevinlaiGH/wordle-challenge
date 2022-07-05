export default function Line({ guess }) {
  const tiles = [];

  for (let i = 0; i < 5; i++) {
    const char = guess[i];
    const tile = (
      <div key={i} className="tile">
        {char}
      </div>
    );
    tiles.push(tile);
  }
  return <div className="line">{tiles}</div>;
}
