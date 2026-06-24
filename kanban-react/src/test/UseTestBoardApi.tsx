import { useEffect, useState } from 'react'
import type { BoardDefinition } from '../domain/BoardDefinition';
import type { Story } from '../domain/story';
import { createBoard } from '../domain/Board';

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

    const [boardDefinition, setBoardDefinition] = useState<BoardDefinition>({
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
    });

    function getBoard(): Promise<Response> {
        return Promise.resolve(new Response(
            JSON.stringify(createBoard(boardDefinition, stories)),
            { status: 200, statusText: 'OK' }));
    }

    return { getBoard }
}
