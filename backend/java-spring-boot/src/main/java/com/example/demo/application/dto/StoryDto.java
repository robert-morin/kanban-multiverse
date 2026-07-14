package com.example.demo.application.dto;

import java.time.LocalDate;

public record StoryDto(
    long id,
    String title, 
    String description,
    String[] tags,
    String owner,
    String status,
    LocalDate creationDate,
    LocalDate lastStatusUpdateDate,
    Integer points) {
}
