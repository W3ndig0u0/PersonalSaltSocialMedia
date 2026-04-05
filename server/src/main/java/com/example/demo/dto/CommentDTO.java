package com.example.demo.dto;

import com.example.demo.model.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;

public record CommentDTO(
        Long id,
        User poster,
        String text,
        LocalDateTime createdAt
) {
}
