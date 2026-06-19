package com.example.demo.application;

import lombok.Data;

@Data
public class NewStoryDto {
    public String title;
    public String description;
    public String[] tags;
    public String owner;
    public int points;
}
