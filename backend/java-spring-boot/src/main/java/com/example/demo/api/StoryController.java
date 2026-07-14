package com.example.demo.api;

import com.example.demo.application.*;
import com.example.demo.application.dto.BoardDefinitionDto;
import com.example.demo.application.dto.StoryContentsDto;
import com.example.demo.application.dto.StoryDto;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoryController {
  //private final AtomicLong counter = new AtomicLong();

  private StoryService storyService;
  private NewStoryDtoValidator newStoryDtoValidator = new NewStoryDtoValidator();

  public StoryController(StoryService storyService) {
    this.storyService = storyService;
  }

  @GetMapping("/stories")
  public StoryDto[] getStories() {
    return storyService.getAllStories();
  }
  
  @GetMapping("/story/{id}")
  public StoryDto getStory(@PathVariable Long id) {
    return storyService.getStoryById(id);
  }

  @GetMapping("/boardDefinition")
  public BoardDefinitionDto getBoardDefinition() {
    return storyService.getBoardDefinition();
  }

  @PostMapping("/story")
  @ResponseStatus(code = HttpStatus.CREATED)
  public StoryDto createStory(@RequestBody StoryContentsDto newStoryDto) {
    newStoryDtoValidator.validate(newStoryDto);
    return storyService.createStory(newStoryDto);
  }

  @PutMapping("/story/{id}")
  public StoryDto updateStory(@PathVariable Long id, @RequestBody StoryContentsDto updatedStoryDto) {
    return storyService.updateStory(id, updatedStoryDto);
  }

  @DeleteMapping("/story/{id}")
  public StoryDto deleteStory(@PathVariable Long id) {
    storyService.deleteStory(id);
    return null;
  }
}