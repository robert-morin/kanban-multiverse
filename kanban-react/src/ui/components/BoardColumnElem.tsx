import type { BoardColumn } from '../../domain/BoardColumn';
import '../css/BoardColumn.css';
import StoryEntryElem from "./StoryEntryElem";

type BoardColumnProps = {
    column: BoardColumn
}

export default function BoardColumnElem({ column }: BoardColumnProps) {
    function onDrop(ev : React.DragEvent<HTMLDivElement>) {
        ev.preventDefault();
        const data = ev.dataTransfer?.getData("text/html");
        console.log(`Dropped ${data} onto column ${column.id}`);
        // todo fetch to update the story's column in the backend
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