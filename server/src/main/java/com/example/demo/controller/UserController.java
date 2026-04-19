package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.dto.UserDTO;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "${app.frontend.url}")
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(request));
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.loginUser(request));
    }

    @PutMapping("/{username}/bio")
    public ResponseEntity<UserDTO> updateBio(@PathVariable String username, @RequestBody String bioText) {
        return ResponseEntity.ok(userService.updateBio(username, bioText));
    }

    @PutMapping("/{username}/pfp")
    public ResponseEntity<UserDTO> updatePfp(@PathVariable String username, @RequestBody String imageUrl) {
        return ResponseEntity.ok(userService.updatePfp(username, imageUrl));
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getSpecificUser(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return users.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(users);
    }
}