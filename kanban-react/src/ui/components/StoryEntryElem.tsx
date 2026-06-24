import type { StoryEntry } from '../../domain/StoryEntry';
import '../css/StoryEntry.css';

type StoryEntryProps = {
    story: StoryEntry
}

export default function StoryEntryEntry({ story }: StoryEntryProps) {
  function dragstartHandler(ev: React.DragEvent<HTMLDivElement>) {
    ev.dataTransfer.setData("text/plain", ev?.currentTarget.id);
  }
  return (
    <div className="story-entry" draggable onDragStart={dragstartHandler} id={story.id.toString()}>
        <p className="title">{story.title}</p>
        <p>{story.owner}</p>
    </div>
  );
}