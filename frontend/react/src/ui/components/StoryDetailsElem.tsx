import React, { useState, useEffect } from 'react';
import type { Story } from '../../domain/Story';
import '../css/StoryDetails.css';

type StoryDetailsElemProps = {
    story: Story;
    onSave?: (updatedStory: Story) => void;
    onDelete?: (storyId: number) => void;
    onCancel?: () => void;
}

export function StoryDetailsElem({ story, onSave, onDelete, onCancel }: StoryDetailsElemProps) {
    const [title, setTitle] = useState(story.title);
    const [description, setDescription] = useState(story.description);
    const [owner, setOwner] = useState(story.owner);
    const [status, setStatus] = useState(story.status);
    const [points, setPoints] = useState(story.points);
    const [tags, setTags] = useState<string[]>(story.tags);
    const [newTag, setNewTag] = useState('');
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
            setNewTag('');
        }
    };

    const handleKeyDownTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    const validate = () => {
        const newErrors: { title?: string; points?: string } = {};
        if (!title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (points === undefined || points === null || isNaN(points) || points < 0) {
            newErrors.points = 'Points must be 0 or greater';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        if (onSave) {
            const updatedStory: Story = {
                ...story,
                title: title.trim(),
                description: description.trim(),
                owner: owner.trim(),
                status,
                points: Number(points),
                tags,
                lastStatusUpdateDate: status !== story.status ? new Date() : story.lastStatusUpdateDate
            };
            onSave(updatedStory);
        }
    };

    const handleDelete = () => {
        const confirmed = window.confirm(`Delete story "${title.trim() || story.title}"?`);
        if (confirmed && onDelete) {
            onDelete(story.id);
        }
    };

    return (
        <div className="story-details">
            <h3 className="title">Edit Story #{story.id}</h3>

            <form onSubmit={handleSubmit}>
                {/* Title Input */}
                <div className="form-group">
                    <label htmlFor="story-title">Title</label>
                    <input
                        id="story-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter story title"
                    />
                    {errors.title && <span className="error-message">⚠️ {errors.title}</span>}
                </div>

                {/* Description Input */}
                <div className="form-group">
                    <label htmlFor="story-description">Description</label>
                    <textarea
                        id="story-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter details and descriptions for this story..."
                    />
                </div>

                {/* Grid for Owner, Status, and Points */}
                <div className="form-group row">
                    <div className="form-group">
                        <label htmlFor="story-owner">Owner</label>
                        <input
                            id="story-owner"
                            type="text"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                            placeholder="Assignee name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="story-status">Status</label>
                        <select
                            id="story-status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="story-points">Points</label>
                        <input
                            id="story-points"
                            type="number"
                            min="0"
                            value={points === 0 ? '' : points}
                            onChange={(e) => setPoints(e.target.value === '' ? 0 : Number(e.target.value))}
                            placeholder="Story points"
                        />
                        {errors.points && <span className="error-message">⚠️ {errors.points}</span>}
                    </div>
                </div>

                {/* Tags Editor */}
                <div className="form-group tags-editor-container">
                    <label>Tags</label>
                    <div className="tags-list">
                        {tags.map((tag) => (
                            <span key={tag} className="tag-badge">
                                {tag}
                                <button
                                    type="button"
                                    className="tag-remove-btn"
                                    onClick={() => handleRemoveTag(tag)}
                                    aria-label={`Remove tag ${tag}`}
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="tag-input-container">
                        <input
                            type="text"
                            className="tag-input"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={handleKeyDownTag}
                            placeholder="Add a tag..."
                        />
                        <button
                            type="button"
                            className="btn-secondary-sm"
                            onClick={() => handleAddTag()}
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="form-actions">
                    {onDelete && (
                        <button type="button" className="btn-danger" onClick={handleDelete}>
                            Delete Story
                        </button>
                    )}
                    {onCancel && (
                        <button type="button" className="btn-secondary" onClick={onCancel}>
                            Cancel
                        </button>
                    )}
                    <button type="submit" className="btn-primary">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
