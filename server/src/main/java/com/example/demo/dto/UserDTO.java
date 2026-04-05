package com.example.demo.dto;

public record UserDTO(
        Long id,
        String username,
        String imageUrl,
        String bio
) {
}
