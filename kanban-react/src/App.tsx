import { UseTestBoardApi } from "./test/UseTestBoardApi";
import BoardElem from "./ui/components/BoardElem";

const App = () => {
    const { board, isLoading, error, moveStory } = UseTestBoardApi();

    return (
        <BoardElem board={board} isLoading={isLoading} error={error} moveStory={moveStory} />
    );
}

export default App
