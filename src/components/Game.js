import { useState } from 'react';
import Board from './Board';
import { getMoveDetails } from '../game/logic';

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

  function toggleMoveOrder() {
    setIsAscending((prev) => !prev);
  }

  const moveListItems = history.map((_, moveIndex) => {
    const isCurrent = moveIndex === currentMove;

    if (moveIndex === 0) {
      return (
        <li key={moveIndex}>
          {isCurrent ? (
            <span>You are at game start</span>
          ) : (
            <button onClick={() => jumpTo(0)}>Go to game start</button>
          )}
        </li>
      );
    }

    const details = getMoveDetails(history[moveIndex - 1], history[moveIndex]);

    const renderMeta = details && (
      <span>
        {' — '}
        {details.marker} ({details.row}, {details.col})
      </span>
    );

    return (
      <li key={moveIndex}>
        {isCurrent ? (
          <span>
            You are at move #{moveIndex}
            {renderMeta}
          </span>
        ) : (
          <button onClick={() => jumpTo(moveIndex)}>
            <span>Go to move #{moveIndex}</span>
            {renderMeta}
          </button>
        )}
      </li>
    );
  });

  return (
    <div className="game">
      <Board
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay}
      />

      <div className="game-info">
        <button
          className="move-order-toggle"
          onClick={toggleMoveOrder}
        >
          {isAscending ? 'Show newest first' : 'Show oldest first'}
        </button>

        <ol className="move-list">
          {isAscending ? moveListItems : moveListItems.toReversed()}
        </ol>
      </div>
    </div>
  );
}
