package com.example.demo.domain.exceptions;

public class StoryNotFoundException extends RuntimeException {

    public StoryNotFoundException() {
        super("Story not found");
    }
}
