package com.example.demo.dto;

public record UserDTO(
        String auth0Id,
        String username,
        String imageUrl,
        String bio
) {}