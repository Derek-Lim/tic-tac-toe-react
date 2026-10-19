import { useState } from 'react';
import { DEFAULT_BOARD_SIZE } from '../game/constants';
import Board from './Board';
import MoveHistory from './MoveHistory';

export default function Game() {
  const [boardSize, setBoardSize] = useState(DEFAULT_BOARD_SIZE);
  const [history, setHistory] = useState([
    Array(boardSize * boardSize).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleBoardSizeChange(nextBoardSize) {
    setBoardSize(nextBoardSize);
    setHistory([Array(nextBoardSize * nextBoardSize).fill(null)]);
    setCurrentMove(0);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  return (
    <>
      <div className="game-settings">
        <label htmlFor="board-size-select">Board Size: </label>
        <select
          id="board-size-select"
          value={boardSize}
          onChange={(event) => {
            handleBoardSizeChange(Number(event.target.value));
          }}
        >
          <option value="3">3 x 3</option>
          <option value="4">4 x 4</option>
          <option value="5">5 x 5</option>
        </select>
      </div>
      <div className="game">
        <Board
          boardSize={boardSize}
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />

        <MoveHistory
          boardSize={boardSize}
          history={history}
          currentMove={currentMove}
          onJumpTo={jumpTo}
        />
      </div>
    </>
  );
}
