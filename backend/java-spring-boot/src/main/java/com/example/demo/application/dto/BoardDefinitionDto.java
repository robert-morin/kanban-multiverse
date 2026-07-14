package com.example.demo.application.dto;

import lombok.Data;

@Data
public class BoardDefinitionDto {
    private Long id;
    private String name;
    private ColumnDefinitionDto[] columns;
}
