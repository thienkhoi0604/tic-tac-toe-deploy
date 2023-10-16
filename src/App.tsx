import Board from "./components/board";

function App() {
  return (
    <div className="w-full relative">
      <div className="w-full flex justify-center gap-10">
        <div className="flex flex-col justify-center items-center space-y-6 mt-5">
          <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
          <Board />
        </div>
      </div>
    </div>
  );
}

export default App;
