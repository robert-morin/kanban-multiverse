package com.example.demo.api;

import com.example.demo.application.NewStoryDto;
import com.example.demo.domain.exceptions.MissingParameterException;

public class NewStoryDtoValidator {
    public void validate(NewStoryDto newStoryDto) {
        if (newStoryDto.title == null || newStoryDto.title.trim().isEmpty()) {
            throw new MissingParameterException("title");
        }
    }
}