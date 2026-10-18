import { BOARD_SIZE, WINNING_LINES } from './constants';

// =====================
// Internal helpers (module-private)
// =====================
function indexToRowCol(index) {
  return {
    row: Math.floor(index / BOARD_SIZE) + 1,
    col: index % BOARD_SIZE + 1,
  };
}

// =====================
// Public API (exports)
// =====================
export function calculateWinner(squares) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const player = squares[a];

    if (player && player === squares[b] && player === squares[c]) {
      return { winner: player, winningLine: line };
    }
  }
  return { winner: null, winningLine: [] };
}

export function getMoveDetails(prevSquares, nextSquares) {
  const changedIndex = nextSquares.findIndex(
    (value, i) => value !== prevSquares[i],
  );

  if (changedIndex === -1) return null;

  const marker = nextSquares[changedIndex];
  const { row, col } = indexToRowCol(changedIndex);

  return { marker, row, col };
}
