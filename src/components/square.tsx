type Props = {
  handleClick: (row: number, column: number) => void;
  indexRow: number;
  indexColumn: number;
  color: number;
};

const Square = ({ handleClick, indexRow, indexColumn, color }: Props) => {
  return (
    <div
      className="w-[70px] h-[70px] border border-black flex justify-center items-center hover:cursor-pointer"
      onClick={() => handleClick(indexRow, indexColumn)}
    >
      {color === -1 ? "" : color === 1 ? "X" : "O"}
    </div>
  );
};

export default Square;
