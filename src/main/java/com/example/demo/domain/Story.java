package com.example.demo.domain;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Story {
    // Todo primitives
    private @Id Long id;
    private String title;
    private String description;
    private String[] tags;
    private String owner;
    private String state;
    private LocalDate creationDate;
    private LocalDate lastUpdateDate;
    private int points;

    public Story() {}

    public Story(Long id, String title, String description, String[] tags, String owner, String state,
            LocalDate creationDate, LocalDate lastUpdateDate, int points) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.tags = tags;
        this.owner = owner;
        this.state = state;
        this.creationDate = creationDate;
        this.lastUpdateDate = lastUpdateDate;
        this.points = points;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String[] getTags() {
        return tags;
    }

    public String getOwner() {
        return owner;
    }

    public String getState() {
        return state;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public LocalDate getLastUpdateDate() {
        return lastUpdateDate;
    }

    public int getPoints() {
        return points;
    }
}
