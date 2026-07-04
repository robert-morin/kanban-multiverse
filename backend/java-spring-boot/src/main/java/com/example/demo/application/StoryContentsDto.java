package com.example.demo.application;

import lombok.Data;

@Data
public class StoryContentsDto {
    public String title;
    public String description;
    public String[] tags;
    public String owner;
    public String status;
    public Integer points;
}
