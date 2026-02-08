import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function renderSquare(i) {
    return (
      <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
    );
  }

  const board = [];

  for (let row = 0; row < 3; row++) {
    const squaresInRow = [];

    for (let col = 0; col < 3; col++) {
      squaresInRow.push(renderSquare(row * 3 + col));
    }

    board.push(
      <div key={row} className="board-row">
        {squaresInRow}
      </div>,
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {board}
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
    let description;
    if (moveIndex > 0) {
      description = 'Go to move #' + moveIndex;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={moveIndex}>
        {moveIndex === currentMove ? (
          <span>{'You are at move #' + moveIndex}</span>
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
