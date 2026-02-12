import Square from './Square';
import { BOARD_SIZE } from '../game/constants';
import { calculateWinner, isBoardFull } from '../game/logic';

export default function Board({ xIsNext, squares, onPlay }) {
  const winnerResult = calculateWinner(squares);
  const winner = winnerResult?.player;
  const winningLine = winnerResult?.line ?? [];

  const status = winner
    ? `Winner: ${winner}`
    : isBoardFull(squares)
      ? 'Draw'
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

  function handleClick(index) {
    if (winner || squares[index]) return;

    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="status">{status}</div>

      {Array.from({ length: BOARD_SIZE }).map((_, row) => (
        <div key={row} className="board-row">
          {Array.from({ length: BOARD_SIZE }).map((_, col) => {
            const index = row * BOARD_SIZE + col;
            const isWinningSquare = winningLine.includes(index);

            return (
              <Square
                key={index}
                value={squares[index]}
                isHighlighted={isWinningSquare}
                onSquareClick={() => handleClick(index)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}
