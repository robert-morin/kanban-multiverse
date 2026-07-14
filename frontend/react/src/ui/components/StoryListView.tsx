import { useState } from "react";
import type { Story } from "../../domain/Story";
import {
	type FilterField,
	type SortDirection,
	type SortField,
	useStoryListFilterSort,
} from "../hooks/useStoryListFilterSort";
import StoryListControls from "./StoryListControls";
import StoryListItem from "./StoryListItem";

type StoryListViewProps = {
	stories: Story[];
	onSelectStory: (storyId: number) => void;
};

export default function StoryListView({
	stories,
	onSelectStory,
}: StoryListViewProps) {
	const [sortField, setSortField] = useState<SortField>("title");
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
	const [filterField, setFilterField] = useState<FilterField>("title");
	const [filterValue, setFilterValue] = useState("");

	const sortedStories = useStoryListFilterSort({
		stories,
		sortField,
		sortDirection,
		filterField,
		filterValue,
	});

	return (
		<div className="story-list-view">
			<StoryListControls
				sortField={sortField}
				sortDirection={sortDirection}
				filterField={filterField}
				filterValue={filterValue}
				onSortFieldChange={setSortField}
				onSortDirectionChange={setSortDirection}
				onFilterFieldChange={setFilterField}
				onFilterValueChange={setFilterValue}
			/>

			{sortedStories.map((story) => (
				<StoryListItem key={story.id} story={story} onSelect={onSelectStory} />
			))}
		</div>
	);
}
