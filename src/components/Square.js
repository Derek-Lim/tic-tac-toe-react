export default function Square({ value, isHighlighted, onSquareClick }) {
  return (
    <button
      className={`square ${isHighlighted ? 'highlight' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
