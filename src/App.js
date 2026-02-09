import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const size = 3;

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  function handleClick(i) {
    if (winner || squares[i]) return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="status">{status}</div>
      {Array.from({ length: size }).map((_, row) => (
        <div key={row} className="board-row">
          {Array.from({ length: size }).map((_, col) => {
            const index = row * size + col;
            return (
              <Square
                key={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moveIndices = isAscending
    ? history.map((_, i) => i)
    : history.map((_, i) => history.length - 1 - i);

  const moves = moveIndices.map((moveIndex) => {
    const description = moveIndex > 0
      ? `Go to move #${moveIndex}`
      : 'Go to game start';

    return (
      <li key={moveIndex}>
        {moveIndex === currentMove ? (
          <span>{`You are at move #${moveIndex}`}</span>
        ) : (
          <button onClick={() => jumpTo(moveIndex)}>{description}</button>
        )}
      </li>
    );
  });

  function toggleMoveOrder() {
    setIsAscending((prev) => !prev);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button className="move-order-toggle" onClick={toggleMoveOrder}>
          {isAscending ? 'Ascending' : 'Descending'}
        </button>
        <ol className="move-list">{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
