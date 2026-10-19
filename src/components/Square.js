export default function Square({ value, label, isHighlighted, onSquareClick }) {
  const className = isHighlighted ? 'square highlight' : 'square';

  return (
    <button className={className} aria-label={label} onClick={onSquareClick}>
      {value}
    </button>
  );
}
