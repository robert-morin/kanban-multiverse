import type { StoryEntry } from "../../domain/StoryEntry";
import "../css/StoryEntry.css";

type StoryEntryProps = {
	story: StoryEntry;
	onSelect?: (storyId: number) => void;
};

export default function StoryEntryEntry({ story, onSelect }: StoryEntryProps) {
	function dragstartHandler(ev: React.DragEvent<HTMLDivElement>) {
		ev.dataTransfer.effectAllowed = "move";
		ev.dataTransfer.setData("text/plain", ev.currentTarget.id);
	}

	const getInitials = (name: string) => {
		return name ? name.charAt(0).toUpperCase() : "?";
	};

	const getAvatarBg = (name: string) => {
		if (!name) return "var(--border)";
		const colors = [
			"#ef4444",
			"#f97316",
			"#f59e0b",
			"#10b981",
			"#06b6d4",
			"#3b82f6",
			"#6366f1",
			"#8b5cf6",
			"#d946ef",
		];
		let sum = 0;
		for (let i = 0; i < name.length; i++) {
			sum += name.charCodeAt(i);
		}
		return colors[sum % colors.length];
	};

	return (
		<div
			className="story-entry"
			draggable
			onDragStart={dragstartHandler}
			id={story.id.toString()}
			onClick={() => onSelect && onSelect(story.id)}
		>
			{story.tags && story.tags.length > 0 && (
				<div className="card-tags">
					{story.tags.map((tag) => (
						<span key={tag} className="card-tag-pill">
							{tag}
						</span>
					))}
				</div>
			)}
			<h4 className="card-title">{story.title}</h4>
			<div className="card-footer">
				{"points" in story && typeof (story as any).points === "number" && (
					<span className="card-points">{(story as any).points} pts</span>
				)}
				<div className="card-owner">
					<div
						className="avatar-circle"
						style={{ backgroundColor: getAvatarBg(story.owner) }}
						title={story.owner}
					>
						{getInitials(story.owner)}
					</div>
					<span className="owner-name">{story.owner}</span>
				</div>
			</div>
		</div>
	);
}
