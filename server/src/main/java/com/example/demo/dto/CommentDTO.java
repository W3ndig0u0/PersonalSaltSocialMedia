package com.example.demo.dto;

import java.time.LocalDateTime;

public record CommentDTO(
        Long id,
        String username,
        String text,
        LocalDateTime createdAt
) {}