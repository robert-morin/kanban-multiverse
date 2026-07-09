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
    const [stories, board, moveStory, updateStory, deleteStory, createStory] = useTestHook();
    const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);
    const [isCreatingStory, setIsCreatingStory] = useState(false);
    const [draftStory, setDraftStory] = useState<Story | null>(null);

    const selectedStory = stories.find(s => s.id === selectedStoryId);

    const getEmptyStory = (): Story => ({
        id: Math.max(0, ...stories.map(story => story.id)) + 1,
        title: '',
        description: '',
        tags: [],
        owner: '',
        status: 'To Do',
        creationDate: new Date(),
        lastStatusUpdateDate: new Date(),
        points: 0
    });

    const closeStoryModal = () => {
        setSelectedStoryId(null);
        setIsCreatingStory(false);
        setDraftStory(null);
    };

    const openCreateStoryModal = () => {
        setSelectedStoryId(null);
        setDraftStory(getEmptyStory());
        setIsCreatingStory(true);
    };

    return (
        <div className="board">
            {error && (
                <p>An error occurred: {error}</p>
            )}
            {isLoading ? (
                <p>Loading. Please Wait...</p>
            ) : (
                <>
                    <div className="board-header">
                        <div>
                            <h2>{board.name}</h2>
                            <p>{stories.length} stories (Click any card to edit)</p>
                        </div>
                        <button type="button" className="btn-primary" onClick={openCreateStoryModal}>
                            Create Story
                        </button>
                    </div>
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

            {(selectedStory || (isCreatingStory && draftStory)) && (
                <div className="story-details-overlay" onClick={closeStoryModal}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <StoryDetailsElem
                            story={selectedStory ?? draftStory!}
                            mode={isCreatingStory ? 'create' : 'edit'}
                            onSave={(updated: Story) => {
                                updateStory(updated);
                                closeStoryModal();
                            }}
                            onCreate={(newStory: Story) => {
                                createStory(newStory);
                                closeStoryModal();
                            }}
                            onDelete={(storyId: number) => {
                                deleteStory(storyId);
                                closeStoryModal();
                            }}
                            onCancel={closeStoryModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default BoardElem;
