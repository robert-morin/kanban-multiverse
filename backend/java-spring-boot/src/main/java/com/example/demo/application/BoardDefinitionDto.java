package com.example.demo.application;

import lombok.Data;

@Data
public class BoardDefinitionDto {
    private Long id;
    private String name;
    private String[] columns;
}
