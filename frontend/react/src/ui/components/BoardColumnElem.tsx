import type React from "react";
import { useState } from "react";
import type { BoardColumn } from "../../domain/BoardColumn";
import "../css/BoardColumn.css";
import StoryEntryElem from "./StoryEntryElem";

type BoardColumnProps = {
	column: BoardColumn;
	moveStory: (storyId: number, newStatus: string) => void;
	onSelectStory?: (storyId: number) => void;
};

export default function BoardColumnElem({
	column,
	moveStory,
	onSelectStory,
}: BoardColumnProps) {
	const [isDraggingOver, setIsDraggingOver] = useState(false);

	function onDragOver(ev: React.DragEvent<HTMLDivElement>) {
		ev.preventDefault();
	}

	function onDragEnter(ev: React.DragEvent<HTMLDivElement>) {
		ev.preventDefault();
		setIsDraggingOver(true);
	}

	function onDragLeave(ev: React.DragEvent<HTMLDivElement>) {
		ev.preventDefault();
		setIsDraggingOver(false);
	}

	async function onDrop(ev: React.DragEvent<HTMLDivElement>) {
		ev.preventDefault();
		setIsDraggingOver(false);
		const data = ev.dataTransfer?.getData("text/plain");
		if (data) {
			console.log(`Dropped ${data} onto column ${column.title}`);
			moveStory(parseInt(data, 10), column.title);
		}
	}

	return (
		<div
			className={`board-column ${isDraggingOver ? "dragging-over" : ""}`}
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
					/>
				))}
			</div>
		</div>
	);
}
