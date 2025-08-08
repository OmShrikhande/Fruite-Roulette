package com.fruiteroulette.prostar.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.fruiteroulette.prostar.service.BetService;
import com.fruiteroulette.prostar.service.AuditLogService;

@RestController
@RequestMapping("/history")
public class RoundHistoryController {
    @Autowired
    private AuditLogService auditLogService;
    @Autowired
    private BetService betService;
    @GetMapping("/round/{roundId}")
    public ResponseEntity<?> getRoundHistory(@PathVariable String roundId) {
        auditLogService.log("VIEW_ROUND_HISTORY", "RoundId: " + roundId);
        return ResponseEntity.ok(betService.findByRoundId(roundId));
    }
}
