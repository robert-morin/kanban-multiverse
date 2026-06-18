package com.example.demo.api;

import com.example.demo.application.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoryController {
  //private final AtomicLong counter = new AtomicLong();

  private StoryService storyService;

  public StoryController(StoryService storyService) {
    this.storyService = storyService;
  }

  @GetMapping("/stories")
  public StoryDto[] stories() {
    return storyService.getAllStories();
  }
  
  @GetMapping("/story/{id}")
  public StoryDto story(@PathVariable Long id) {
    return storyService.getStoryById(id);
  }
}
