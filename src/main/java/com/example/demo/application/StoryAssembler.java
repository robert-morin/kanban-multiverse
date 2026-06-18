package com.example.demo.application;

import com.example.demo.domain.Story;

public class StoryAssembler {
    public StoryDto toDto(Story story) {
        return new StoryDto(
            story.getId(),
            story.getTitle(),
            story.getDescription(),
            story.getTags(),
            story.getOwner(),
            story.getState(),
            story.getCreationDate(),
            story.getLastUpdateDate(),
            story.getPoints());
    }
}
