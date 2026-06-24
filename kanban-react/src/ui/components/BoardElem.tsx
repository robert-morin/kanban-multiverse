import type { Board } from "../../domain/Board";
import BoardColumnElem from "./BoardColumnElem";
import '../css/Board.css';
import { useFetchItem } from "../hooks/UseFetchItem";

type BoardProps = {
    getBoard: () => Promise<Response>
}

const BoardElem = ({ getBoard }: BoardProps) => {
    const {isLoading, item, error} = useFetchItem<Board>(getBoard)

    return (
        <div className="board">
            {error && (
                <p>An error occurred: {error}</p>
            )}
            {isLoading ? (
                <p>Loading. Please Wait...</p>
            ) : (
                <>
                    <h2>{item?.name}</h2>
                    <div className="board-columns">
                        {item?.columns.map((column) => (
                        <BoardColumnElem key={column.id} column={column} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default BoardElem
