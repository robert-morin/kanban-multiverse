import { useEffect, useMemo, useState } from 'react'
import type { BoardDefinition } from '../domain/BoardDefinition';
import type { Story } from '../domain/Story';
import { createBoard, type Board } from '../domain/Board';

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

const defaultStories: Story[] = [
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
];

// Todo column Ids?
export function UseTestBoardApi() {
    const [stories, setStories] = useState<Story[]>(defaultStories);
    const [board, setBoard] = useState<Board>(createBoard(boardDefinition, stories));

    const isLoading = false;
    const error = null;

    async function moveStory(storyId: number, newStatus: string) {
        setStories(_ => []);
        setBoard(_ => createBoard(boardDefinition, []));
    }

    /*function moveStory(storyId: number, newStatus: string): Promise<void> {
        return new Promise((resolve) => {
            console.log(`Foo`);
            setStories(prevStories => {
                const updatedStories = prevStories.map(story => {
                    if (story.id === storyId) {
                        console.log(`Moving story ${storyId} to status ${newStatus}`);
                        return {
                            ...story,
                            status: newStatus,
                            lastStatusUpdateDate: new Date()
                        };
                    }
                    return story;
                });
                return updatedStories;
            });
            resolve();
        });
    }*/

    useEffect(() => {
        const updatedBoard = createBoard(boardDefinition, stories);
        setBoard(updatedBoard);
    }, [stories, boardDefinition]);

    return { board, isLoading, error, moveStory }
}
