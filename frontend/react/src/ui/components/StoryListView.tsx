import { useMemo, useState } from 'react';
import type { Story } from '../../domain/Story';

type SortField = 'title' | 'owner' | 'status';
type SortDirection = 'asc' | 'desc';
type FilterField = 'title' | 'owner' | 'tags';

type StoryListViewProps = {
    stories: Story[];
    onSelectStory: (storyId: number) => void;
};

export default function StoryListView({ stories, onSelectStory }: StoryListViewProps) {
    const [sortField, setSortField] = useState<SortField>('title');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [filterField, setFilterField] = useState<FilterField>('title');
    const [filterValue, setFilterValue] = useState('');

    const filteredStories = useMemo(() => {
        const normalizedFilter = filterValue.trim().toLowerCase();
        if (!normalizedFilter) {
            return stories;
        }

        return stories.filter((story) => {
            if (filterField === 'tags') {
                return story.tags.some((tag) => tag.toLowerCase().includes(normalizedFilter));
            }

            const value = story[filterField].toLowerCase();
            return value.includes(normalizedFilter);
        });
    }, [filterField, filterValue, stories]);

    const sortedStories = useMemo(() => {
        const sorted = [...filteredStories].sort((left, right) => {
            const leftValue = left[sortField].toLowerCase();
            const rightValue = right[sortField].toLowerCase();

            if (leftValue < rightValue) {
                return -1;
            }
            if (leftValue > rightValue) {
                return 1;
            }
            return left.id - right.id;
        });

        return sortDirection === 'desc' ? sorted.reverse() : sorted;
    }, [sortDirection, sortField, filteredStories]);

    return (
        <div className="story-list-view">
            <div className="story-list-controls">
                <label className="story-list-control">
                    <span>Sort by</span>
                    <select value={sortField} onChange={(e) => setSortField(e.target.value as SortField)}>
                        <option value="title">Title</option>
                        <option value="owner">Owner</option>
                        <option value="status">Status</option>
                    </select>
                </label>
                <label className="story-list-control">
                    <span>Order</span>
                    <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value as SortDirection)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
                <label className="story-list-control story-list-filter">
                    <span>Filter by</span>
                    <select value={filterField} onChange={(e) => setFilterField(e.target.value as FilterField)}>
                        <option value="title">Title</option>
                        <option value="owner">Owner</option>
                        <option value="tags">Tags</option>
                    </select>
                    <input
                        type="text"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        placeholder="Enter filter value"
                    />
                </label>
            </div>

            {sortedStories.map((story) => (
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
