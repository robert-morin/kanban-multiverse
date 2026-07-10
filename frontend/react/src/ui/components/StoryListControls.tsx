import type { SortField, SortDirection, FilterField } from '../hooks/useStoryListFilterSort';

type StoryListControlsProps = {
    sortField: SortField;
    sortDirection: SortDirection;
    filterField: FilterField;
    filterValue: string;
    onSortFieldChange: (value: SortField) => void;
    onSortDirectionChange: (value: SortDirection) => void;
    onFilterFieldChange: (value: FilterField) => void;
    onFilterValueChange: (value: string) => void;
};

export default function StoryListControls({
    sortField,
    sortDirection,
    filterField,
    filterValue,
    onSortFieldChange,
    onSortDirectionChange,
    onFilterFieldChange,
    onFilterValueChange,
}: StoryListControlsProps) {
    return (
        <div className="story-list-controls">
            <label className="story-list-control">
                <span>Sort by</span>
                <select value={sortField} onChange={(e) => onSortFieldChange(e.target.value as SortField)}>
                    <option value="title">Title</option>
                    <option value="owner">Owner</option>
                    <option value="status">Status</option>
                </select>
            </label>
            <label className="story-list-control">
                <span>Order</span>
                <select value={sortDirection} onChange={(e) => onSortDirectionChange(e.target.value as SortDirection)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </label>
            <label className="story-list-control story-list-filter">
                <span>Filter by</span>
                <select value={filterField} onChange={(e) => onFilterFieldChange(e.target.value as FilterField)}>
                    <option value="title">Title</option>
                    <option value="owner">Owner</option>
                    <option value="tags">Tags</option>
                </select>
                <input
                    type="text"
                    value={filterValue}
                    onChange={(e) => onFilterValueChange(e.target.value)}
                    placeholder="Enter filter value"
                />
            </label>
        </div>
    );
}
