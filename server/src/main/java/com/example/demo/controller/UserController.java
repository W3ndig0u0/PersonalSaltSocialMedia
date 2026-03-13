package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public String register(@RequestBody User newUser) {
        userRepository.save(newUser);
        return "User " + newUser.getUsername() + " Saved!";
    }
    @PostMapping("/login")
    public String login(@RequestBody User loginDetails) {
        User user = userRepository.findByUsername(loginDetails.getUsername());

        if (user == null) {
            return "User Not Found!";
        }

        if (user.getPassword().equals(loginDetails.getPassword())) {
            return user.getUsername();
        } else {
            return "Wrong Password!";
        }
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
