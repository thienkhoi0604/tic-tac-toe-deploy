import { useState } from "react";
import Square from "./square";

type History = {
  row: number;
  column: number;
};

const initialBoard = () => {
  const rows = new Array(3);
  for (let i = 0; i < rows.length; i++) {
    rows[i] = new Array(3).fill(-1);
  }

  return rows;
};

const Board = () => {
  const [board, setBoard] = useState<Array<Array<number>>>(initialBoard);
  const [history, setHistory] = useState<Array<History>>([]);
  const [xIsNext, setXIsNext] = useState(true);

  const checkTie = () => {
    for (let i = 0; i < board.length; i++) {
      if (board[i].includes(-1)) {
        return false;
      }
    }
    return true;
  };

  const sortAscending = (first: History, second: History) => {
    if (first.row == second.row) {
      return first.column - second.column;
    } else {
      return first.row > second.row ? 1 : -1;
    }
  };

  const handleSortAscesding = () => {
    const prevHistory = history.slice();
    prevHistory.sort(sortAscending);
    setHistory(prevHistory);
  };

  const handleSortDescending = () => {
    const prevHistory = history.slice();
    prevHistory.sort(sortAscending);
    prevHistory.reverse();
    setHistory(prevHistory);
  };

  const handleClick = (row: number, column: number) => {
    if (board[row][column] === -1) {
      const grid = board;
      const history_temp = history;

      grid[row][column] = xIsNext ? 1 : 0;
      history_temp.push({ row, column });

      setHistory(history_temp);
      setXIsNext(!xIsNext);
      setBoard(grid);

      const checkDir = (
        row_temp: number,
        column_temp: number,
        color: number
      ) => {
        let tracked = 0;
        let row_curr = row;
        let column_curr = column;

        while (
          grid[row_curr] !== undefined &&
          grid[row_curr][column_curr] === color
        ) {
          tracked += 1;
          column_curr += column_temp;
          row_curr += row_temp;
        }
        return tracked;
      };

      const x_horizontal = checkDir(0, 1, 1) + checkDir(0, -1, 1) - 1;
      const o_horizontal = checkDir(0, 1, 0) + checkDir(0, -1, 0) - 1;

      const x_vertical = checkDir(1, 0, 1) + checkDir(-1, 0, 1) - 1;
      const o_vertical = checkDir(1, 0, 0) + checkDir(-1, 0, 0) - 1;

      const x_diag1 = checkDir(1, 1, 1) + checkDir(-1, -1, 1) - 1;
      const o_diag1 = checkDir(1, 1, 0) + checkDir(-1, -1, 0) - 1;

      const x_diag2 = checkDir(-1, 1, 1) + checkDir(1, -1, 1) - 1;
      const o_diag2 = checkDir(-1, 1, 0) + checkDir(1, -1, 0) - 1;

      if (
        x_horizontal === 3 ||
        x_vertical === 3 ||
        x_diag1 === 3 ||
        x_diag2 === 3
      ) {
        setTimeout(() => {
          alert("X wins");
        }, 0);
      } else if (
        o_horizontal === 3 ||
        o_vertical === 3 ||
        o_diag1 === 3 ||
        o_diag2 === 3
      ) {
        setTimeout(() => {
          alert("O wins");
        }, 0);
      } else if (checkTie()) {
        setTimeout(() => {
          alert("Draw");
        }, 0);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-7 items-start justify-center">
      <div className="border border-black">
        {board.map((row, indexRow) => {
          return (
            <div className="flex flex-row" key={indexRow}>
              {row.map((_square, indexColumn) => {
                const color = board[indexRow][indexColumn];
                return (
                  <Square
                    key={indexColumn}
                    handleClick={handleClick}
                    indexRow={indexRow}
                    indexColumn={indexColumn}
                    color={color}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <h2 className="text-2xl font-semibold">History</h2>
          <button
            className="border border-black rounded-[4px] px-3 hover:bg-rose-300"
            onClick={handleSortAscesding}
          >
            ASC
          </button>
          <button
            className="border border-black rounded-[4px] px-3 hover:bg-rose-300"
            onClick={handleSortDescending}
          >
            DESC
          </button>
        </div>
        <ul>
          {history.map((item, index) => {
            return (
              <li key={index}>
                You are at #row: {item.row} #col: {item.column}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Board;
