import { useEffect, useState } from "react";
import boardApi from "../../api/boardApi";
import { type Board, createBoard } from "../../domain/Board";
import type { BoardDefinition } from "../../domain/BoardDefinition";
import type { Story } from "../../domain/Story";

export function useBoardApi() {
	const [stories, setStories] = useState<Story[]>([]);
	const [boardDefinition, setBoardDefinition] =
		useState<BoardDefinition | null>(null);
	const [board, setBoard] = useState<Board | null>(null);

	useEffect(() => {
		boardApi
			.getStories()
			.then((newStories) => {
				setStories(newStories);
				boardApi
					.getBoardDefinition()
					.then((actualData) => {
						setBoardDefinition(actualData);
						setBoard(createBoard(actualData, newStories));
					})
					.catch((_) => {
						setBoard(null);
					});
			})
			.catch((_) => {
				setStories([]);
			});
	}, []);

	async function moveStory(storyId: string, newStatus: string) {
		let movedStory: Story;
		try {
			movedStory = await boardApi.moveStory(storyId, newStatus);
		} catch (error) {
			console.error(
				`Error moving story ${storyId} to status ${newStatus}:`,
				error,
			);
			return;
		}
		const updatedStories = stories.map((story) => {
			if (story.id === storyId) {
				return movedStory;
			}
			return story;
		});
		setStories((_) => updatedStories);
		if (boardDefinition) {
			setBoard((_) => createBoard(boardDefinition, updatedStories));
		}
	}

	async function updateStory(updatedStory: Story) {
		let backendStory: Story;
		try {
			backendStory = await boardApi.updateStory(updatedStory);
		} catch (error) {
			console.error(`Error updating story ${updatedStory.id}:`, error);
			return;
		}
		const updatedStories = stories.map((story) => {
			if (story.id === updatedStory.id) {
				return backendStory;
			}
			return story;
		});
		setStories((_) => updatedStories);
		if (boardDefinition) {
			setBoard((_) => createBoard(boardDefinition, updatedStories));
		}
	}

	async function deleteStory(storyId: string) {
		try {
			await boardApi.deleteStory(storyId);
		} catch (error) {
			console.error(`Error deleting story ${storyId}:`, error);
			return;
		}
		const updatedStories = stories.filter((story) => story.id !== storyId);
		setStories((_) => updatedStories);
		if (boardDefinition) {
			setBoard((_) => createBoard(boardDefinition, updatedStories));
		}
	}

	async function createStory(newStory: Story) {
		let createdStory: Story;
		try {
			createdStory = await boardApi.createStory(newStory);
		} catch (error) {
			console.error(`Error creating story:`, error);
			return;
		}
		const updatedStories = [...stories, createdStory];
		setStories((_) => updatedStories);
		if (boardDefinition) {
			setBoard((_) => createBoard(boardDefinition, updatedStories));
		}
	}

	return [
		stories,
		board,
		moveStory,
		updateStory,
		deleteStory,
		createStory,
	] as const;
}
