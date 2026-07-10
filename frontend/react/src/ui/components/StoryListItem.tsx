import type { Story } from '../../domain/Story';

type StoryListItemProps = {
    story: Story;
    onSelect: (storyId: number) => void;
};

export default function StoryListItem({ story, onSelect }: StoryListItemProps) {
    return (
        <button
            key={story.id}
            type="button"
            className="story-list-item"
            onClick={() => onSelect(story.id)}
        >
            <div className="story-list-item-main">
                <div>
                    <h4>{story.title}</h4>
                    <p>{story.description || 'No description provided.'}</p>
                </div>
                <span className="story-list-item-status">{story.status}</span>
            </div>
            <div className="story-list-item-meta">
                <span>Owner: {story.owner || 'Unassigned'}</span>
                <span>Points: {story.points}</span>
                {story.tags.length > 0 && (
                    <span>Tags: {story.tags.join(', ')}</span>
                )}
            </div>
        </button>
    );
}
