import { useState } from "react";
import BoardColumnElem from "./BoardColumnElem";
import BoardHeader from "./BoardHeader";
import { StoryDetailsElem } from "./StoryDetailsElem";
import StoryListView from "./StoryListView";
import "../css/Board.css";
import type { Story } from "../../domain/Story";
import { useBoardApi } from "../hooks/UseBoardApi";

type BoardProps = {
	isLoading: boolean;
	error: string | null;
};

export type ViewMode = "board" | "list";

const BoardElem = ({ isLoading, error }: BoardProps) => {
	const [stories, board, moveStory, updateStory, deleteStory, createStory] =
		useBoardApi();
	const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
	const [isCreatingStory, setIsCreatingStory] = useState(false);
	const [draftStory, setDraftStory] = useState<Story | null>(null);
	const [viewMode, setViewMode] = useState<ViewMode>("board");

	const selectedStory = stories.find((s) => s.id === selectedStoryId);

	const getPreviousStatus = (currentStatus: string): string => {
		const statuses = board?.columns.map((col) => col.title) || [];
		const currentIndex = statuses.indexOf(currentStatus);
		if (currentIndex > 0) {
			return statuses[currentIndex - 1];
		}
		return currentStatus; // If already at the first status, return the same
	}

	const getNextStatus = (currentStatus: string): string => {
		const statuses = board?.columns.map((col) => col.title) || [];
		const currentIndex = statuses.indexOf(currentStatus);
		if (currentIndex < statuses.length - 1) {
			return statuses[currentIndex + 1];
		}
		return currentStatus; // If already at the last status, return the same
	}

	const getEmptyStory = (): Story => ({
		id: `draft-${Date.now()}`,
		title: "",
		description: "",
		tags: [],
		owner: "",
		status: "To Do",
		creationDate: new Date(),
		lastStatusUpdateDate: new Date(),
		points: 0,
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

	const storyToDisplay = selectedStory ?? (isCreatingStory ? draftStory : null);

	return (
		<div className="board">
			{error && <p>An error occurred: {error}</p>}
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
					{viewMode === "board" ? (
						<div className="board-columns">
							{board.columns.map((column) => (
								<BoardColumnElem
									key={column.position}
									column={column}
									moveStory={moveStory}
									onSelectStory={setSelectedStoryId}
									getPreviousStatus={getPreviousStatus}
									getNextStatus={getNextStatus}
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

			{storyToDisplay && (
				<div className="story-details-overlay">
					<div
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => e.stopPropagation()}
						role="dialog"
						aria-modal="true"
						tabIndex={-1}
					>
						<StoryDetailsElem
							story={storyToDisplay}
							mode={isCreatingStory ? "create" : "edit"}
							onSave={(updated: Story) => {
								updateStory(updated);
								closeStoryModal();
							}}
							onCreate={(newStory: Story) => {
								createStory(newStory);
								closeStoryModal();
							}}
							onDelete={async (storyId: string) => {
								await deleteStory(storyId);
								closeStoryModal();
							}}
							onCancel={closeStoryModal}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default BoardElem;
