package com.example.demo.controller;

import com.example.demo.dto.CommentRequest;
import com.example.demo.dto.CreatePostRequest;
import com.example.demo.dto.LikeRequest;
import com.example.demo.dto.PostDTO;
import com.example.demo.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "${app.frontend.url}")
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<PostDTO> createPost(@RequestBody CreatePostRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(postService.createPost(request));
    }

    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getSpecificPost(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<PostDTO> toggleLike(@PathVariable Long id, @RequestBody LikeRequest request) {
        return ResponseEntity.ok(postService.toggleLike(id, request));
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<PostDTO> addComment(@PathVariable Long id, @RequestBody CommentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(postService.addComment(id, request));
    }
}