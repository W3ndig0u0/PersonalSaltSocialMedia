package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.dto.UserDTO;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO registerUser(RegisterRequest registerRequest) {
        if (userRepository.findByUsername(registerRequest.username()) != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username is already taken!");
        }

        User user = new User();
        user.setUsername(registerRequest.username());
        user.setPassword(registerRequest.password());

        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    public UserDTO loginUser(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.username());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        if (!user.getPassword().equals(loginRequest.password())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Wrong password");
        }

        return convertToDTO(user);
    }

    public UserDTO updateBio(String username, String bioText) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        user.setBio(bioText);
        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    public UserDTO updatePfp(String username, String imageUrl) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        user.setImageUrl(imageUrl);
        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    public UserDTO getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return convertToDTO(user);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    private UserDTO convertToDTO(User savedUser) {
        return new UserDTO(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getImageUrl(),
                savedUser.getBio()
        );
    }
}