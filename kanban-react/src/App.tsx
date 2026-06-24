import { UseTestBoardApi } from "./test/useTestBoardApi";
import BoardElem from "./ui/components/BoardElem";

const App = () => {
    const { getBoard } = UseTestBoardApi();

    return (
        <BoardElem getBoard={getBoard} />
    );
}

export default App
