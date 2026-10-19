import { BOARD_SIZE } from './constants';

// =====================
// Internal helpers (module-private)
// =====================
const winningLines = generateWinningLines(BOARD_SIZE);

function indexToRowCol(index) {
  return {
    row: Math.floor(index / BOARD_SIZE) + 1,
    col: (index % BOARD_SIZE) + 1,
  };
}

function generateWinningLines(size) {
  if (!Number.isInteger(size) || size <= 0) return [];
  if (size === 1) return [[0]];

  const indices = Array.from({ length: size }, (_, index) => index);

  const horizontalLines = indices.map((row) =>
    indices.map((col) => row * size + col),
  );

  const verticalLines = indices.map((col) =>
    indices.map((row) => row * size + col),
  );

  const mainDiagonal = indices.map((row) => row * size + row);
  const antiDiagonal = indices.map((row) => row * size + (size - 1 - row));

  return [...horizontalLines, ...verticalLines, mainDiagonal, antiDiagonal];
}


// =====================
// Public API (exports)
// =====================
export function calculateWinner(squares) {
  for (const line of winningLines) {
    const player = squares[line[0]];
    if (!player) continue;

    const isWinningLine = line.every(
      (squareIndex) => squares[squareIndex] === player,
    );

    if (isWinningLine) {
      return { winner: player, winningLine: line };
    }
  }

  return { winner: null, winningLine: [] };
}

export function getMoveDetails(previousSquares, nextSquares) {
  const squareIndex = nextSquares.findIndex(
    (value, index) => value !== previousSquares[index],
  );

  if (squareIndex === -1) return null;

  const marker = nextSquares[squareIndex];
  const { row, col } = indexToRowCol(squareIndex);

  return { marker, row, col };
}
