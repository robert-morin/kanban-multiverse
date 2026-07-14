import { useMemo } from "react";
import type { Story } from "../../domain/Story";

type SortField = "title" | "owner" | "status";
type SortDirection = "asc" | "desc";
type FilterField = "title" | "owner" | "tags";

type UseStoryListFilterSortOptions = {
	stories: Story[];
	sortField: SortField;
	sortDirection: SortDirection;
	filterField: FilterField;
	filterValue: string;
};

export function useStoryListFilterSort({
	stories,
	sortField,
	sortDirection,
	filterField,
	filterValue,
}: UseStoryListFilterSortOptions) {
	return useMemo(() => {
		const normalizedFilter = filterValue.trim().toLowerCase();
		const filtered = normalizedFilter
			? stories.filter((story) => {
					if (filterField === "tags") {
						return story.tags.some((tag) =>
							tag.toLowerCase().includes(normalizedFilter),
						);
					}

					return story[filterField].toLowerCase().includes(normalizedFilter);
				})
			: stories;

		const sorted = [...filtered].sort((left, right) => {
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

		return sortDirection === "desc" ? sorted.reverse() : sorted;
	}, [stories, sortField, sortDirection, filterField, filterValue]);
}

export type { FilterField, SortDirection, SortField };
