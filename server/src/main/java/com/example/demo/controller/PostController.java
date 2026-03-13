package com.example.demo.controller;

import com.example.demo.model.Post;
import com.example.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @PostMapping("/create")
    public String createPost(@RequestBody Post newPost) {
        postRepository.save(newPost);
        return "Post created by " + newPost.getUser().getUsername() + "!";
    }

    @GetMapping("/all")
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // 3. Toggle Like (Add/Remove username from Set)
    @PostMapping("/{id}/like")
    public ResponseEntity<String> toggleLike(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String username = body.get("username");
        Post post = postRepository.findById(id).orElse(null);

        if (post == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found!");
        }

        if (post.getLikes().contains(username)) {
            post.getLikes().remove(username);
            postRepository.save(post);
            return ResponseEntity.ok("Unliked!");
        } else {
            post.getLikes().add(username);
            postRepository.save(post);
            return ResponseEntity.ok("Liked!");
        }
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<String> addComment(@PathVariable Long id, @RequestBody String commentText) {
        Post post = postRepository.findById(id).orElse(null);

        if (post == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found!");
        }

        post.getComments().add(commentText);
        postRepository.save(post);
        return ResponseEntity.ok("Comment added!");
    }
}
