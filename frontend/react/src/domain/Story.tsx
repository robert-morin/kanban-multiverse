export type Story = {
	id: string;
	title: string;
	description: string;
	tags: string[];
	owner: string;
	status: string;
	creationDate: Date;
	lastStatusUpdateDate: Date;
	points: number;
};

/*
const stories: StoryEntry[] = [
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
        status: 'Todo',
        creationDate: new Date('2024-06-01T12:00:00Z'),
        lastStatusUpdateDate: new Date('2024-06-01T12:00:00Z'),
        points: 3
    },
];*/
