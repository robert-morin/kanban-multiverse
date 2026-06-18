package com.example.demo.application;

import java.time.LocalDate;

public record StoryDto(
    long id,
    String title, 
    String description,
    String[] tags,
    String owner,
    String state,
    LocalDate creationDate,
    LocalDate lastUpdateDate,
    int points) {
}
