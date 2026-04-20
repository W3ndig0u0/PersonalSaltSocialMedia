package com.example.demo.service;

import com.example.demo.dto.UserDTO;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public UserDTO syncUser(String auth0Id, String email, String nickname) {
        User user = userRepository.findById(auth0Id)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setAuth0Id(auth0Id);
                    newUser.setEmail(email);
                    newUser.setUsername(nickname != null ? nickname : email.split("@")[0]);
                    return userRepository.save(newUser);
                });
        return convertToDTO(user);
    }

    @Transactional
    public UserDTO updateBio(String auth0Id, String bioText) {
        User user = userRepository.findById(auth0Id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        user.setBio(bioText);
        return convertToDTO(user);
    }

    @Transactional
    public UserDTO updatePfp(String auth0Id, String imageUrl) {
        User user = userRepository.findById(auth0Id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        user.setImageUrl(imageUrl);
        return convertToDTO(user);
    }

    public UserDTO getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(this::convertToDTO)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + username));
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(this::convertToDTO).toList();
    }

    private UserDTO convertToDTO(User user) {
        return new UserDTO(user.getAuth0Id(), user.getUsername(), user.getImageUrl(), user.getBio());
    }
}