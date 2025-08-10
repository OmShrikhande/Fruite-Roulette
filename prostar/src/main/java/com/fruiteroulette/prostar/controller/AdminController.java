package com.fruiteroulette.prostar.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import com.fruiteroulette.prostar.service.AuditLogService;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AuditLogService auditLogService;
    @PostMapping("/set-multiplier")
    public ResponseEntity<?> setMultiplier(@RequestBody MultiplierRequest req) {
        auditLogService.log("SET_MULTIPLIER", "Fruit: " + req.fruit + ", Multiplier: " + req.multiplier);
        // TODO: Implement multiplier logic
        return ResponseEntity.ok("Multiplier set");
    }
    @PostMapping("/ban-user")
    public ResponseEntity<?> banUser(@RequestBody BanUserRequest req) {
        auditLogService.log("BAN_USER", "UserId: " + req.userId);
        // TODO: Implement ban logic
        return ResponseEntity.ok("User banned");
    }
    public static class MultiplierRequest {
        public String fruit;
        public int multiplier;
    }
    public static class BanUserRequest {
        public Long userId;
    }
}
