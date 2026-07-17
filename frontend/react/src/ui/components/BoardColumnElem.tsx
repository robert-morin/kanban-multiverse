import type React from "react";
import { useState } from "react";
import type { BoardColumn } from "../../domain/BoardColumn";
import "../css/BoardColumn.css";
import StoryEntryElem from "./StoryEntryElem";

type BoardColumnProps = {
	column: BoardColumn;
	moveStory: (storyId: string, newStatus: string) => void;
	onSelectStory?: (storyId: string) => void;
	getPreviousStatus: (currentStatus: string) => string;
	getNextStatus: (currentStatus: string) => string;
};

export default function BoardColumnElem({
	column,
	moveStory,
	onSelectStory,
	getPreviousStatus,
	getNextStatus,
}: BoardColumnProps) {
	const [isDraggingOver, setIsDraggingOver] = useState(false);

	function onDragOver(ev: React.DragEvent<HTMLElement>) {
		ev.preventDefault();
	}

	function onDragEnter(ev: React.DragEvent<HTMLElement>) {
		ev.preventDefault();
		setIsDraggingOver(true);
	}

	function onDragLeave(ev: React.DragEvent<HTMLElement>) {
		ev.preventDefault();
		setIsDraggingOver(false);
	}

	async function onDrop(ev: React.DragEvent<HTMLElement>) {
		ev.preventDefault();
		setIsDraggingOver(false);
		const data = ev.dataTransfer?.getData("text/plain");
		if (data) {
			console.log(`Dropped ${data} onto column ${column.title}`);
			moveStory(data, column.title);
		}
	}

	return (
		<section
			className={`board-column ${isDraggingOver ? "dragging-over" : ""}`}
			aria-label={`${column.title} column drop zone`}
			onDragOver={onDragOver}
			onDragEnter={onDragEnter}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
		>
			<div className="column-header">
				<h3 className="column-title">{column.title}</h3>
				<span className="column-badge">{column.stories.length}</span>
			</div>
			<div className="column-cards">
				{column.stories.map((story) => (
					<StoryEntryElem
						key={story.id}
						story={story}
						onSelect={onSelectStory}
						moveStoryPreviousStatus={() => moveStory(story.id, getPreviousStatus(column.title))}
						moveStoryNextStatus={() => moveStory(story.id, getNextStatus(column.title))}
					/>
				))}
			</div>
		</section>
	);
}
