package com.example.demo.application;

import com.example.demo.domain.Story;
import com.example.demo.domain.exceptions.StoryNotFoundException;

public class StoryService {
    // TODO repository
    private Story[] stories = new Story[] {
        new Story(1L, "Story 1", "This is a description of story 1.", new String[] {"tag1", "tag2"}, "owner1", "open", java.time.LocalDate.now(), java.time.LocalDate.now(), 5),
        new Story(2L, "Story 2", "This is a description of story 2.", new String[] {"tag3", "tag4"}, "owner2", "closed", java.time.LocalDate.now(), java.time.LocalDate.now(), 8)
    };

    private StoryAssembler storyAssembler = new StoryAssembler();

    public StoryDto[] getAllStories() {
        return java.util.Arrays.stream(stories)
            .map(story -> storyAssembler.toDto(story))
            .toArray(StoryDto[]::new);
    }

    public StoryDto getStoryById(Long id) {
        return java.util.Arrays.stream(stories)
            .filter(story -> story.getId().equals(id))
            .findFirst()
            .map(story -> storyAssembler.toDto(story))
            .orElseThrow(() -> new StoryNotFoundException());
    }
}
