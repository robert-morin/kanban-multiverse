package com.example.demo.application;

import java.security.SecureRandom;
import java.time.LocalDate;

import com.example.demo.application.dto.StoryContentsDto;
import com.example.demo.application.dto.StoryDto;
import com.example.demo.domain.Story;

public class StoryAssembler {
    private SecureRandom secureRandom = new SecureRandom();

    public StoryDto toDto(Story story) {
        return new StoryDto(
            story.getId(),
            story.getTitle(),
            story.getDescription(),
            story.getTags(),
            story.getOwner(),
            story.getStatus(),
            story.getCreationDate(),
            story.getLastStatusUpdateDate(),
            story.getPoints());
    }

    public Story toEntity(StoryContentsDto newStoryDto) {
        long id = Math.abs(secureRandom.nextLong());
        LocalDate now = java.time.LocalDate.now();

        Story story = new Story(
            id,
            newStoryDto.title,
            newStoryDto.description,
            newStoryDto.tags,
            newStoryDto.owner,
            // Todo
            "new",
            now,
            now,
            newStoryDto.points);
        return story;
    }
}
