import type React from "react";
import { useEffect, useState } from "react";
import type { Story } from "../../domain/Story";
import "../css/StoryDetails.css";
import StoryFormActions from "./StoryFormActions";
import StoryFormFields from "./StoryFormFields";
import StoryTagsEditor from "./StoryTagsEditor";

type StoryDetailsElemProps = {
	story: Story;
	mode?: "edit" | "create";
	onSave?: (updatedStory: Story) => void;
	onCreate?: (newStory: Story) => void;
	onDelete?: (storyId: number) => void;
	onCancel?: () => void;
};

export function StoryDetailsElem({
	story,
	mode = "edit",
	onSave,
	onCreate,
	onDelete,
	onCancel,
}: StoryDetailsElemProps) {
	const [title, setTitle] = useState(story.title);
	const [description, setDescription] = useState(story.description);
	const [owner, setOwner] = useState(story.owner);
	const [status, setStatus] = useState(story.status);
	const [points, setPoints] = useState(story.points);
	const [tags, setTags] = useState<string[]>(story.tags);
	const [newTag, setNewTag] = useState("");
	const [errors, setErrors] = useState<{ title?: string; points?: string }>({});

	// Keep state in sync if story prop changes
	useEffect(() => {
		setTitle(story.title);
		setDescription(story.description);
		setOwner(story.owner);
		setStatus(story.status);
		setPoints(story.points);
		setTags(story.tags);
		setErrors({});
	}, [story]);

	const handleAddTag = (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		const trimmed = newTag.trim();
		if (trimmed && !tags.includes(trimmed)) {
			setTags([...tags, trimmed]);
			setNewTag("");
		}
	};

	const handleKeyDownTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAddTag();
		}
	};

	const handleRemoveTag = (tagToRemove: string) => {
		setTags(tags.filter((t) => t !== tagToRemove));
	};

	const validate = () => {
		const newErrors: { title?: string; points?: string } = {};
		if (!title.trim()) {
			newErrors.title = "Title is required";
		}
		if (
			points === undefined ||
			points === null ||
			isNaN(points) ||
			points < 0
		) {
			newErrors.points = "Points must be 0 or greater";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		const storyToSubmit: Story = {
			...story,
			title: title.trim(),
			description: description.trim(),
			owner: owner.trim(),
			status,
			points: Number(points),
			tags,
			lastStatusUpdateDate:
				status !== story.status ? new Date() : story.lastStatusUpdateDate,
		};

		if (mode === "create") {
			if (onCreate) {
				onCreate(storyToSubmit);
			}
			return;
		}

		if (onSave) {
			onSave(storyToSubmit);
		}
	};

	const handleDelete = () => {
		const confirmed = window.confirm(
			`Delete story "${title.trim() || story.title}"?`,
		);
		if (confirmed && onDelete) {
			onDelete(story.id);
		}
	};

	const isCreateMode = mode === "create";

	return (
		<div className="story-details">
			<h3 className="title">
				{isCreateMode ? "Create Story" : `Edit Story #${story.id}`}
			</h3>

			<form onSubmit={handleSubmit}>
				<StoryFormFields
					title={title}
					description={description}
					owner={owner}
					status={status}
					points={points}
					errors={errors}
					onTitleChange={setTitle}
					onDescriptionChange={setDescription}
					onOwnerChange={setOwner}
					onStatusChange={setStatus}
					onPointsChange={setPoints}
				/>

				<StoryTagsEditor
					tags={tags}
					newTag={newTag}
					onNewTagChange={setNewTag}
					onAddTag={handleAddTag}
					onRemoveTag={handleRemoveTag}
					onKeyDownTag={handleKeyDownTag}
				/>

				<StoryFormActions
					isCreateMode={isCreateMode}
					onDelete={!isCreateMode ? handleDelete : undefined}
					onCancel={onCancel}
				/>
			</form>
		</div>
	);
}
