import { useState } from "react";
import BoardColumnElem from "./BoardColumnElem";
import { StoryDetailsElem } from "./StoryDetailsElem";
import '../css/Board.css';
import { useTestHook } from "../hooks/UseTestHook";
import type { Story } from "../../domain/Story";

type BoardProps = {
    isLoading: boolean,
    error: string | null,
}

const BoardElem = ({ isLoading, error }: BoardProps) => {
    const [stories, board, moveStory, updateStory] = useTestHook();
    const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);

    const selectedStory = stories.find(s => s.id === selectedStoryId);

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
                    <p>{stories.length} stories (Click any card to edit)</p>
                    <div className="board-columns">
                        {board.columns.map((column) => (
                            <BoardColumnElem
                                key={column.id}
                                column={column}
                                moveStory={moveStory}
                                onSelectStory={setSelectedStoryId}
                            />
                        ))}
                    </div>
                </>
            )}

            {selectedStory && (
                <div className="story-details-overlay" onClick={() => setSelectedStoryId(null)}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <StoryDetailsElem
                            story={selectedStory}
                            onSave={(updated: Story) => {
                                updateStory(updated);
                                setSelectedStoryId(null);
                            }}
                            onCancel={() => setSelectedStoryId(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default BoardElem;
