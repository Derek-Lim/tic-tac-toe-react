import Square from './Square';
import { BOARD_SIZE } from '../game/constants';
import { calculateWinner } from '../game/logic';

export default function Board({ xIsNext, squares, onPlay }) {
  const { winner, winningLine } = calculateWinner(squares);

  function handleClick(squareIndex) {
    if (winner || squares[squareIndex]) return;

    const nextSquares = squares.slice();
    nextSquares[squareIndex] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const isBoardFull = squares.every((square) => square !== null);

  const status = winner
    ? `Winner: ${winner}`
    : isBoardFull
      ? 'Draw'
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const boardRows = Array.from({ length: BOARD_SIZE }, (_, rowIndex) => (
    <div className="board-row" key={rowIndex}>
      {Array.from({ length: BOARD_SIZE }, (_, colIndex) => {
        const squareIndex = rowIndex * BOARD_SIZE + colIndex;
        const value = squares[squareIndex];
        const isWinningSquare = winningLine.includes(squareIndex);
        const squareLabel = `Row ${rowIndex + 1}, column ${colIndex + 1}: ${value ?? 'empty'}`;

        return (
          <Square
            key={squareIndex}
            value={value}
            label={squareLabel}
            isHighlighted={isWinningSquare}
            onSquareClick={() => handleClick(squareIndex)}
          />
        );
      })}
    </div>
  ));

  return (
    <div className="game-board">
      <div className="status" role="status">
        {status}
      </div>
      {boardRows}
    </div>
  );
}
