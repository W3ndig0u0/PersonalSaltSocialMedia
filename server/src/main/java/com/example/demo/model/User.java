package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
    @Table(name = "users")
    public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Getter
        @Column(unique = true, nullable = false)
        private String username;

        @Getter
        @Column(nullable = false)
        private String password;

        public User() {}

}

