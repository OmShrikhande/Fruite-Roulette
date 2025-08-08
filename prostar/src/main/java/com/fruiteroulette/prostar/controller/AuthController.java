package com.fruiteroulette.prostar.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.fruiteroulette.prostar.model.User;
import com.fruiteroulette.prostar.service.UserService;
import com.fruiteroulette.prostar.security.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserService userService;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        var userOpt = userService.findByEmail(request.email);
        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(request.password)) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        String token = jwtUtil.generateToken(request.email);
        return ResponseEntity.ok().body(new LoginResponse(token, userOpt.get().getEmail(), userOpt.get().getId()));
    }

    public static class LoginResponse {
        public String token;
        public String email;
        public Long id;
        public LoginResponse(String token, String email, Long id) {
            this.token = token;
            this.email = email;
            this.id = id;
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        if (userService.findByEmail(request.email).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        User user = new User();
        user.setEmail(request.email);
        user.setPassword(request.password); // TODO: Hash password
        userService.save(user);
        return ResponseEntity.ok().body("Signup successful");
    }

    // DTOs
    public static class LoginRequest {
        public String email;
        public String password;
    }
    public static class SignupRequest {
        public String email;
        public String password;
    }
}
