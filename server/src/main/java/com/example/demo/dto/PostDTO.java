package com.example.demo.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public record PostDTO (
     Long id,
     String content,
     String imageUrl,
     LocalDateTime createdAt,
     String username,
     List<CommentDTO> comments,
     Set<String> likedBy
){}
