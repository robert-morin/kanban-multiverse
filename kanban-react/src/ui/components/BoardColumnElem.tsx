import type { BoardColumn } from '../../domain/BoardColumn';
import '../css/BoardColumn.css';
import StoryEntryElem from "./StoryEntryElem";

type BoardColumnProps = {
    column: BoardColumn,
    moveStory: (storyId: number, newStatus: string) =>Promise<void>
}

export default function BoardColumnElem({ column, moveStory }: BoardColumnProps) {
    async function onDrop(ev : React.DragEvent<HTMLDivElement>) {
        ev.preventDefault();
        const data = ev.dataTransfer?.getData("text/plain");
        console.log(`Dropped ${data} onto column ${column.id}`);
        await moveStory(parseInt(data), column.title)
    }

    return (
        <div className="board-column" onDragOver={(event) => event.preventDefault()} onDrop={onDrop}>
            <h2 className="title">{column.title}</h2>
            {column.stories.map((story) => (
                <StoryEntryElem key={story.id} story={story} />
            ))}
        </div>
    );
};