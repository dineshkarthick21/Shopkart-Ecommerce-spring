package com.example.Course.Registration.Project.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Course.Registration.Project.Repository.UserDetailsRepo;
import com.example.Course.Registration.Project.model.Users;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "https://shopkart-enqf.onrender.com"}, allowCredentials = "true")
public class SignUpController {

    @Autowired
    private UserDetailsRepo userDetailsRepo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        Map<String, String> response = new HashMap<>();

        // Validate input
        if (signUpRequest.getUsername() == null || signUpRequest.getUsername().trim().isEmpty()) {
            response.put("message", "Username is required");
            return ResponseEntity.badRequest().body(response);
        }

        if (signUpRequest.getPassword() == null || signUpRequest.getPassword().length() < 6) {
            response.put("message", "Password must be at least 6 characters");
            return ResponseEntity.badRequest().body(response);
        }

        if (signUpRequest.getRole() == null || signUpRequest.getRole().trim().isEmpty()) {
            response.put("message", "Role is required");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            // Check if username already exists
            Users existingUser = userDetailsRepo.getByUsername(signUpRequest.getUsername());
            if (existingUser != null) {
                response.put("message", "Username already exists");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            // Create new user
            Users newUser = new Users();
            newUser.setUsername(signUpRequest.getUsername());
            newUser.setPassword(encoder.encode(signUpRequest.getPassword()));
            newUser.setRole(signUpRequest.getRole()); // Will automatically add ROLE_ prefix

            // Save to database
            userDetailsRepo.save(newUser);
            response.put("message", "User registered successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            System.err.println("Database error during signup: " + e.getMessage());
            response.put("message", "Database connection error. Please check MongoDB connection.");
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
        }
    }
}

// Inner class for request body
class SignUpRequest {
    private String username;
    private String password;
    private String role;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
