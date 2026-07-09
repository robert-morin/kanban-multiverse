type StoryFormActionsProps = {
    isCreateMode: boolean;
    onDelete?: () => void;
    onCancel?: () => void;
};

export default function StoryFormActions({ isCreateMode, onDelete, onCancel }: StoryFormActionsProps) {
    return (
        <div className="form-actions">
            {!isCreateMode && onDelete && (
                <button type="button" className="btn-danger" onClick={onDelete}>
                    Delete Story
                </button>
            )}
            {onCancel && (
                <button type="button" className="btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
            )}
            <button type="submit" className="btn-primary">
                {isCreateMode ? 'Create Story' : 'Save Changes'}
            </button>
        </div>
    );
}
