import { useState } from "react";
import BoardColumnElem from "./BoardColumnElem";
import BoardHeader from "./BoardHeader";
import StoryListView from "./StoryListView";
import { StoryDetailsElem } from "./StoryDetailsElem";
import '../css/Board.css';
import type { Story } from "../../domain/Story";
import { useBoardApi } from "../hooks/UseBoardApi";

type BoardProps = {
    isLoading: boolean,
    error: string | null,
}

export type ViewMode = 'board' | 'list';

const BoardElem = ({ isLoading, error }: BoardProps) => {
    const [stories, board, moveStory, updateStory, deleteStory, createStory] = useBoardApi();
    const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);
    const [isCreatingStory, setIsCreatingStory] = useState(false);
    const [draftStory, setDraftStory] = useState<Story | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('board');

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
            {isLoading || !board ? (
                <p>Loading. Please Wait...</p>
            ) : (
                <>
                    <BoardHeader
                        boardName={board.name}
                        storyCount={stories.length}
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                        onCreateStory={openCreateStoryModal}
                    />
                    {viewMode === 'board' ? (
                        <div className="board-columns">
                            {board.columns.map((column, index) => (
                                <BoardColumnElem
                                    key={index}
                                    column={column}
                                    moveStory={moveStory}
                                    onSelectStory={setSelectedStoryId}
                                />
                            ))}
                        </div>
                    ) : (
                        <StoryListView
                            stories={stories}
                            onSelectStory={(storyId) => {
                                setIsCreatingStory(false);
                                setDraftStory(null);
                                setSelectedStoryId(storyId);
                            }}
                        />
                    )}
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
