package com.example.demo.api.exceptions;

public class ErrorResponse {
    public int statusCode;
    public String description;

    public ErrorResponse() {
    }

    public ErrorResponse(int statusCode, String description) {
        this.statusCode = statusCode;
        this.description = description;
    }
}
