package com.example.demo.application;

import org.springframework.stereotype.Service;

import com.example.demo.domain.BoardRepository;
import com.example.demo.domain.Story;
import com.example.demo.domain.StoryRepository;
import com.example.demo.domain.exceptions.StoryNotFoundException;

@Service
public class StoryService {

    private StoryRepository storyRepository;
    private StoryAssembler storyAssembler = new StoryAssembler();
    private BoardRepository boardRepository;

    public StoryService(StoryRepository repository, BoardRepository boardRepository) {
        this.storyRepository = repository;
        this.boardRepository = boardRepository;
    }

    public BoardDefinitionDto getBoardDefinition() {
        return boardRepository.findById(1L)
            .map(board -> {
                BoardDefinitionDto dto = new BoardDefinitionDto();
                dto.setId(board.getId());
                dto.setName(board.getName());
                dto.setColumns(board.getColumns().clone());
                return dto;
            })
            .orElseThrow(() -> new RuntimeException("Board not found"));
    }

    public StoryDto[] getAllStories() {
        return storyRepository.findAll().stream()
            .map(story -> storyAssembler.toDto(story))
            .toArray(StoryDto[]::new);
    }

    public StoryDto getStoryById(Long id) {
        return storyRepository.findById(id)
            .map(story -> storyAssembler.toDto(story))
            .orElseThrow(() -> new StoryNotFoundException());
    }

    public StoryDto createStory(StoryContentsDto newStoryDto) {
        Story newStory = storyAssembler.toEntity(newStoryDto);
        Story savedStory = storyRepository.save(newStory);
        return storyAssembler.toDto(savedStory);
    }

    public String getUpdatedValue(String oldValue, String newValue) {
        return newValue != null && !newValue.trim().isEmpty() ? newValue : oldValue;
    }

    public <T> T getUpdatedValue(T oldValue, T newValue) {
        return newValue != null ? newValue : oldValue;
    }

    public StoryDto updateStory(Long id, StoryContentsDto updatedStoryDto) {
        Story existingStory = storyRepository.findById(id)
            .orElseThrow(() -> new StoryNotFoundException());

        Story updatedStory = new Story(
            id, 
            getUpdatedValue(existingStory.getTitle(), updatedStoryDto.title),
            getUpdatedValue(existingStory.getDescription(), updatedStoryDto.description),
            getUpdatedValue(existingStory.getTags(), updatedStoryDto.tags),
            getUpdatedValue(existingStory.getOwner(), updatedStoryDto.owner),
            getUpdatedValue(existingStory.getStatus(), updatedStoryDto.status),
            existingStory.getCreationDate(),
            existingStory.getStatus().equals(updatedStoryDto.status) ?
                existingStory.getLastStatusUpdateDate() :
                java.time.LocalDate.now(),
            getUpdatedValue(existingStory.getPoints(), updatedStoryDto.points));

        Story savedStory = storyRepository.save(updatedStory);
        return storyAssembler.toDto(savedStory);
    }

    public void deleteStory(Long id) {
        Story existingStory = storyRepository.findById(id)
            .orElseThrow(() -> new StoryNotFoundException());
        storyRepository.delete(existingStory);
    }
}
