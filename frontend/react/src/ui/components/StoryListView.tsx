import type { Story } from '../../domain/Story';

type StoryListViewProps = {
    stories: Story[];
    onSelectStory: (storyId: number) => void;
};

export default function StoryListView({ stories, onSelectStory }: StoryListViewProps) {
    return (
        <div className="story-list-view">
            {stories.map((story) => (
                <button
                    key={story.id}
                    type="button"
                    className="story-list-item"
                    onClick={() => onSelectStory(story.id)}
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
            ))}
        </div>
    );
}
