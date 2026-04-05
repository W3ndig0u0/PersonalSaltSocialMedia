package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.model.Comment;
import com.example.demo.model.Post;
import com.example.demo.model.User;
import com.example.demo.repository.PostRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public PostDTO createPost(CreatePostRequest request) {
        User author = userRepository.findByUsername(request.username());

        if (author == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!");
        }

        Post newPost = new Post();
        newPost.setContent(request.content());
        newPost.setImageUrl(request.imageUrl());
        newPost.setUser(author);

        Post savedPost = postRepository.save(newPost);
        return convertToDTO(savedPost);
    }

    public List<PostDTO> getAllPosts() {
        return postRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public PostDTO getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found!"));
        return convertToDTO(post);
    }

    public PostDTO toggleLike(Long id, LikeRequest request) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found!"));
        if (post.getLikes().contains(request.username())) {
            post.getLikes().remove(request.username());
        } else {
            post.getLikes().add(request.username());
        }
        Post savePost = postRepository.save(post);
        return convertToDTO(savePost);
    }

    public PostDTO addComment(Long id, CommentRequest request) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found!"));
        User author = userRepository.findByUsername(request.username());
        if (author == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!");
        }
        Comment newComment = new Comment(author, request.content());
        post.getComments().add(newComment);

        Post savedPost = postRepository.save(post);
        return convertToDTO(savedPost);
    }

    private PostDTO convertToDTO(Post post) {
        List<CommentDTO> commentDTOs = post.getComments().stream()
                .map(comment -> new CommentDTO(
                        comment.getId(),
                        comment.getText(),
                        comment.getPoster().getUsername(),
                        comment.getCreatedAt()
                ))
                .toList();

        return new PostDTO(
                post.getId(),
                post.getContent(),
                post.getImageUrl(),
                post.getCreatedAt(),
                post.getUser().getUsername(),
                commentDTOs,
                post.getLikes()
        );
    }


}
