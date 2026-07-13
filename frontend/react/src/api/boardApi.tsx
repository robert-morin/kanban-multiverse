import { baseServerUrl } from '../config'
import type { BoardDefinition } from '../domain/BoardDefinition'
import type { Story } from '../domain/Story'

const getStories = async (): Promise<Story[]> => {
    const response = await fetch(`${baseServerUrl}/stories`)
    if (!response.ok) {
        throw new Error('Stories could not be found.')
    }
    return await response.json()
}

const getBoardDefinition = async (): Promise<BoardDefinition> => {
    const response = await fetch(`${baseServerUrl}/boardDefinition`)
    if (!response.ok) {
        throw new Error('Board definition could not be found.')
    }
    return await response.json()
}

const moveStory = async (storyId: number, newStatus: string): Promise<Story> => {
    const body = {
        status: newStatus,
        lastStatusUpdateDate: new Date()
    }
    const response = await fetch(
        `${baseServerUrl}/story/${storyId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }
    )
    if (!response.ok) {
        throw new Error('Story could not be moved.')
    }
    return response.json()
}

const updateStory = async (updatedStory: Story): Promise<Story> => {
    const body = {
        title: updatedStory.title,
        description: updatedStory.description,
        tags: updatedStory.tags,
        owner: updatedStory.owner,
        status: updatedStory.status,
        creationDate: updatedStory.creationDate,
        lastStatusUpdateDate: updatedStory.lastStatusUpdateDate,
        points: updatedStory.points
    }
    const response = await fetch(
        `${baseServerUrl}/story/${updatedStory.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }
    )
    if (!response.ok) {
        throw new Error('Story could not be updated.')
    }
    return response.json()
}

const deleteStory = async (storyId: number): Promise<void> => {
    const response = await fetch(`${baseServerUrl}/story/${storyId}`, {
        method: 'DELETE'
    })
    if (!response.ok) {
        throw new Error('Story could not be deleted.')
    }
}

const createStory = async (newStory: Story): Promise<Story> => {
    const body = {
        title: newStory.title,
        description: newStory.description,
        tags: newStory.tags,
        owner: newStory.owner,
        status: newStory.status,
        creationDate: newStory.creationDate,
        lastStatusUpdateDate: newStory.lastStatusUpdateDate,
        points: newStory.points
    }
    const response = await fetch(
        `${baseServerUrl}/stories`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }
    )
    if (!response.ok) {
        throw new Error('Story could not be created.')
    }
    return response.json()
}

export default {
    getStories,
    getBoardDefinition,
    moveStory,
    updateStory,
    deleteStory,
    createStory
}
