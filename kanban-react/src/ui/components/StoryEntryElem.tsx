import type { StoryEntry } from '../../domain/StoryEntry';
import '../css/StoryEntry.css';

type StoryEntryProps = {
    story: StoryEntry;
    onSelect?: (storyId: number) => void;
}

export default function StoryEntryEntry({ story, onSelect }: StoryEntryProps) {
  function dragstartHandler(ev: React.DragEvent<HTMLDivElement>) {
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData('text/plain', ev.currentTarget.id);
  }
  return (
    <div
      className="story-entry"
      draggable
      onDragStart={dragstartHandler}
      id={story.id.toString()}
      onClick={() => onSelect && onSelect(story.id)}
    >
        <p className="title">{story.title}</p>
        <p>{story.owner}</p>
    </div>
  );
}