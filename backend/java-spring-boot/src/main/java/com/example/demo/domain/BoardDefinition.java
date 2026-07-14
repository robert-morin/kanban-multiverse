package com.example.demo.domain;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
public class BoardDefinition {
    private @Id Long id;
    private String name;
    
    @ElementCollection
    @CollectionTable(
        name = "board_columns", 
        joinColumns = @JoinColumn(name = "board_id")
    )
    private List<ColumnDefinition> columns;
}
