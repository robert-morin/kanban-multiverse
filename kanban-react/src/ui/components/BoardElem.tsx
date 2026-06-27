import type { Board } from "../../domain/Board";
import BoardColumnElem from "./BoardColumnElem";
import '../css/Board.css';
import { useTestHook } from "../hooks/UseTestHook";

type BoardProps = {
    //board: Board,
    isLoading: boolean,
    error: string | null,
    //moveStory: (storyId: number, newStatus: string) =>Promise<void>
}

const BoardElem = ({ isLoading, error }: BoardProps) => {
    const [stories, board, moveStory] = useTestHook();

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
                    <p>{stories.length} stories</p>
                    <button onClick={() => moveStory(1, 'In Progress')}>Increment</button>
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
