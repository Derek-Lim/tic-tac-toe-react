import { useState } from 'react';
import { getMoveDetails } from '../game/logic';

export default function MoveHistory({ history, currentMove, onJumpTo }) {
  const [isAscending, setIsAscending] = useState(true);

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
            <button onClick={() => onJumpTo(0)}>Go to game start</button>
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
          <button onClick={() => onJumpTo(moveIndex)}>
            <span>Go to move #{moveIndex}</span>
            {renderMeta}
          </button>
        )}
      </li>
    );
  });

  return (
    <div className="game-info">
      <button className="move-order-toggle" onClick={toggleMoveOrder}>
        {isAscending ? 'Show newest first' : 'Show oldest first'}
      </button>

      <ol className="move-list">
        {isAscending ? moveListItems : moveListItems.toReversed()}
      </ol>
    </div>
  );
}
