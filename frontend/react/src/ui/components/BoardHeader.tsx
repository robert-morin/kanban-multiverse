import type { ViewMode } from "./BoardElem";

type BoardHeaderProps = {
	boardName: string;
	storyCount: number;
	viewMode: ViewMode;
	onViewModeChange: (mode: ViewMode) => void;
	onCreateStory: () => void;
};

export default function BoardHeader({
	boardName,
	storyCount,
	viewMode,
	onViewModeChange,
	onCreateStory,
}: BoardHeaderProps) {
	return (
		<div className="board-header">
			<div>
				<h2>{boardName}</h2>
				<p>{storyCount} stories (Click any card to edit)</p>
			</div>
			<div className="board-actions">
				<div
					className="board-view-toggle"
					role="tablist"
					aria-label="Story view selector"
				>
					<button
						type="button"
						className={`view-toggle-btn ${viewMode === "board" ? "active" : ""}`}
						onClick={() => onViewModeChange("board")}
					>
						Board
					</button>
					<button
						type="button"
						className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
						onClick={() => onViewModeChange("list")}
					>
						List
					</button>
				</div>
				<button type="button" className="btn-primary" onClick={onCreateStory}>
					Create Story
				</button>
			</div>
		</div>
	);
}
