import type { StoryEntry } from "./StoryEntry"

export type BoardColumn = {
    id: number,
    title: string,
    stories: StoryEntry[]
}