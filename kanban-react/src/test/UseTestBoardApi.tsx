import { useMemo, useState } from 'react'
import type { BoardDefinition } from '../domain/BoardDefinition';
import type { Story } from '../domain/Story';
import { createBoard } from '../domain/Board';

const boardDefinition: BoardDefinition = {
    id: 1,
    name: 'Example Board',
    columns: [
        {
            id: 1,
            title: 'To Do'
        },
        {
            id: 2,
            title: 'In Progress'
        },
        {
            id: 3,
            title: 'Done'
        }
    ]
};

// Todo column Ids?
export function UseTestBoardApi() {
    const [stories, setStories] = useState<Story[]>([
        {
            id: 1,
            title: 'Implement login feature',
            description: 'This is the first story',
            tags: ['authentication', 'frontend'],
            owner: 'Alice',
            status: 'To Do',
            creationDate: new Date('2024-06-01T12:00:00Z'),
            lastStatusUpdateDate: new Date('2024-06-01T12:00:00Z'),
            points: 5
        },
        {
            id: 2,
            title: 'Implement other feature',
            description: 'This is the second story',
            tags: ['authentication', 'foo'],
            owner: 'Bob',
            status: 'To Do',
            creationDate: new Date('2024-06-01T12:00:00Z'),
            lastStatusUpdateDate: new Date('2024-06-01T12:00:00Z'),
            points: 3
        },
        {
            id: 3,
            title: 'Implement third feature',
            description: 'This is the third story',
            tags: ['backend', 'database'],
            owner: 'Charlie',
            status: 'Done',
            creationDate: new Date('2024-06-01T12:00:00Z'),
            lastStatusUpdateDate: new Date('2024-06-01T12:00:00Z'),
            points: 1
        },
    ]);

    const board = useMemo(() => createBoard(boardDefinition, stories), [stories]);

    const isLoading = false;
    const error = null;

    function moveStory(storyId: number, newStatus: string): Promise<void> {
        setStories(prevStories =>
            prevStories.map(story =>
                story.id === storyId
                    ? { ...story, status: newStatus, lastStatusUpdateDate: new Date() }
                    : story
            )
        );

        return Promise.resolve();
    }

    return { board, isLoading, error, moveStory }
}
