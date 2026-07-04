import type { BoardColumn } from "./BoardColumn"
import type { BoardDefinition } from "./BoardDefinition";
import type { Story } from "./Story";

export type Board = {
    id: number,
    name: string,
    columns: BoardColumn[]
}

function createBoard(boardDefinition: BoardDefinition, stories: Story[]): Board {
    const columns: BoardColumn[] = boardDefinition.columns.map(columnDefinition => {
        const columnStories = stories.filter(story => story.status === columnDefinition.title);
        return {
            id: columnDefinition.id,
            title: columnDefinition.title,
            stories: columnStories
        };
    });
    return {
        id: boardDefinition.id,
        name: boardDefinition.name,
        columns: columns
    };
}

export { createBoard };