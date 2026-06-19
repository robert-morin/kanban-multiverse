package com.example.demo.application;

import org.springframework.stereotype.Service;

import com.example.demo.domain.Story;
import com.example.demo.domain.StoryRepository;
import com.example.demo.domain.exceptions.StoryNotFoundException;

@Service
public class StoryService {

    private StoryRepository storyRepository;
    private StoryAssembler storyAssembler = new StoryAssembler();

    public StoryService(StoryRepository repository) {
        this.storyRepository = repository;
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

    public StoryDto createStory(NewStoryDto newStoryDto) {
        Story newStory = storyAssembler.toEntity(newStoryDto);
        Story savedStory = storyRepository.save(newStory);
        return storyAssembler.toDto(savedStory);
    }
}
