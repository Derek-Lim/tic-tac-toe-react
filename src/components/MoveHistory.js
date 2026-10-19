import { useState } from 'react';
import { getMoveDetails } from '../game/logic';

export default function MoveHistory({
  boardSize,
  history,
  currentMove,
  onJumpTo,
}) {
  const [isAscending, setIsAscending] = useState(true);

  function toggleMoveOrder() {
    setIsAscending((previousIsAscending) => !previousIsAscending);
  }

  const moveListItems = history.map((squares, moveIndex) => {
    const isCurrentMove = moveIndex === currentMove;
    const moveLabel = moveIndex === 0 ? 'game start' : `move #${moveIndex}`;

    const moveDetails =
      moveIndex === 0
        ? null
        : getMoveDetails(history[moveIndex - 1], squares, boardSize);

    const detailsLabel = moveDetails
      ? ` — ${moveDetails.marker} (${moveDetails.row}, ${moveDetails.col})`
      : '';

    const moveDescription = isCurrentMove ? (
      `You are at ${moveLabel}${detailsLabel}`
    ) : (
      <button onClick={() => onJumpTo(moveIndex)}>
        Go to {moveLabel}
        {detailsLabel}
      </button>
    );

    return <li key={moveIndex}>{moveDescription}</li>;
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
