import type { Board } from "../../domain/Board";
import BoardColumnElem from "./BoardColumnElem";
import '../css/Board.css';
import { useTestHook } from "../hooks/UseTestHook";

type BoardProps = {
    board: Board,
    isLoading: boolean,
    error: string | null,
    moveStory: (storyId: number, newStatus: string) =>Promise<void>
}

const BoardElem = ({ board, isLoading, error, moveStory }: BoardProps) => {
    const [value, increment] = useTestHook();

    return (
        <div className="board">
            {error && (
                <p>An error occurred: {error}</p>
            )}
            {isLoading ? (
                <p>Loading. Please Wait...</p>
            ) : (
                <>
                    <h2>{board.name}</h2>
                    <p>{value} stories</p>
                    <button onClick={increment}>Increment</button>
                    <div className="board-columns">
                        {board.columns.map((column) => (
                        <BoardColumnElem key={column.id} column={column} moveStory={moveStory} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default BoardElem
