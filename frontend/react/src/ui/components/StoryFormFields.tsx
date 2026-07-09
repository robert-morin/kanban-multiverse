type StoryFormFieldsProps = {
    title: string;
    description: string;
    owner: string;
    status: string;
    points: number;
    errors: { title?: string; points?: string };
    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onOwnerChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onPointsChange: (value: number) => void;
};

export default function StoryFormFields({
    title,
    description,
    owner,
    status,
    points,
    errors,
    onTitleChange,
    onDescriptionChange,
    onOwnerChange,
    onStatusChange,
    onPointsChange,
}: StoryFormFieldsProps) {
    return (
        <>
            <div className="form-group">
                <label htmlFor="story-title">Title</label>
                <input
                    id="story-title"
                    type="text"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="Enter story title"
                />
                {errors.title && <span className="error-message">⚠️ {errors.title}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="story-description">Description</label>
                <textarea
                    id="story-description"
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    placeholder="Enter details and descriptions for this story..."
                />
            </div>

            <div className="form-group row">
                <div className="form-group">
                    <label htmlFor="story-owner">Owner</label>
                    <input
                        id="story-owner"
                        type="text"
                        value={owner}
                        onChange={(e) => onOwnerChange(e.target.value)}
                        placeholder="Assignee name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="story-status">Status</label>
                    <select
                        id="story-status"
                        value={status}
                        onChange={(e) => onStatusChange(e.target.value)}
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
                        onChange={(e) => onPointsChange(e.target.value === '' ? 0 : Number(e.target.value))}
                        placeholder="Story points"
                    />
                    {errors.points && <span className="error-message">⚠️ {errors.points}</span>}
                </div>
            </div>
        </>
    );
}
