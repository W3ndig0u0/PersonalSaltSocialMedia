package com.example.demo.controller;

import com.example.demo.dto.UserDTO;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "${app.frontend.url}")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getMyProfile(@AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(userService.syncUser(
                jwt.getSubject(),
                jwt.getClaimAsString("email"),
                jwt.getClaimAsString("nickname")
        ));
    }

    @PatchMapping("/me/bio")
    public ResponseEntity<UserDTO> updateBio(@AuthenticationPrincipal Jwt jwt, @RequestBody String bioText) {
        return ResponseEntity.ok(userService.updateBio(jwt.getSubject(), bioText));
    }

    @PatchMapping("/me/pfp")
    public ResponseEntity<UserDTO> updatePfp(@AuthenticationPrincipal Jwt jwt, @RequestBody String imageUrl) {
        return ResponseEntity.ok(userService.updatePfp(jwt.getSubject(), imageUrl));
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return users.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(users);
    }
}