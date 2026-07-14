import type { StoryEntry } from "./StoryEntry";

export type BoardColumn = {
	position: number;
	title: string;
	stories: StoryEntry[];
};
