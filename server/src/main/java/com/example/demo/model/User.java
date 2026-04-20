package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    private String auth0Id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(name = "image_url")
    private String imageUrl;
    private String email;
    @Column()
    private String bio;
}