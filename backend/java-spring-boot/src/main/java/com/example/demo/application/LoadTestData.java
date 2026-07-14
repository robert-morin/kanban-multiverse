package com.example.demo.application;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.demo.domain.BoardDefinition;
import com.example.demo.domain.BoardRepository;
import com.example.demo.domain.ColumnDefinition;
import com.example.demo.domain.Story;
import com.example.demo.domain.StoryRepository;

@Configuration
class LoadTestData {

  private static final Logger log = LoggerFactory.getLogger(LoadTestData.class);

  @Bean
  CommandLineRunner initDatabase(StoryRepository repository, BoardRepository boardRepository) {

    List<ColumnDefinition> columns = List.of(
        new ColumnDefinition(0, "To Do"),
        new ColumnDefinition(1, "In Progress"),
        new ColumnDefinition(2, "Done")
    );
    return args -> {
      log.info("Preloading " + boardRepository.save(new BoardDefinition(1L, "Board 1", columns)));
      log.info("Preloading " + repository.save(new Story(1L, "Story 1", "This is a description of story 1.", new String[]{"tag1", "tag2"}, "owner1", "In Progress", java.time.LocalDate.now(), java.time.LocalDate.now(), 5)));
      log.info("Preloading " + repository.save(new Story(2L, "Story 2", "This is a description of story 2.", new String[]{"tag3", "tag4"}, "owner2", "Done", java.time.LocalDate.now(), java.time.LocalDate.now(), 8)));
    };
  }
}