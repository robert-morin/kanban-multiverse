type StoryTagsEditorProps = {
    tags: string[];
    newTag: string;
    onNewTagChange: (value: string) => void;
    onAddTag: () => void;
    onRemoveTag: (tag: string) => void;
    onKeyDownTag: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function StoryTagsEditor({
    tags,
    newTag,
    onNewTagChange,
    onAddTag,
    onRemoveTag,
    onKeyDownTag,
}: StoryTagsEditorProps) {
    return (
        <div className="form-group tags-editor-container">
            <label>Tags</label>
            <div className="tags-list">
                {tags.map((tag) => (
                    <span key={tag} className="tag-badge">
                        {tag}
                        <button
                            type="button"
                            className="tag-remove-btn"
                            onClick={() => onRemoveTag(tag)}
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
                    onChange={(e) => onNewTagChange(e.target.value)}
                    onKeyDown={onKeyDownTag}
                    placeholder="Add a tag..."
                />
                <button
                    type="button"
                    className="btn-secondary-sm"
                    onClick={() => onAddTag()}
                >
                    Add
                </button>
            </div>
        </div>
    );
}
