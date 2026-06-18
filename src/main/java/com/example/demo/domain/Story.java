package com.example.demo.domain;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@EqualsAndHashCode
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
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
}
