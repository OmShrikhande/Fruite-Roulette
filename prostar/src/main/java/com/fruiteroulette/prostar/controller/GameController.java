package com.fruiteroulette.prostar.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.fruiteroulette.prostar.model.Bet;
import com.fruiteroulette.prostar.service.BetService;
import com.fruiteroulette.prostar.service.RoundService;
import com.fruiteroulette.prostar.service.AuditLogService;

@RestController
@RequestMapping("/game")
public class GameController {
    @Autowired
    private AuditLogService auditLogService;
    @Autowired
    private RoundService roundService;
    @Autowired
    private BetService betService;
    @GetMapping("/current-round")
    public ResponseEntity<?> getCurrentRound() {
        return ResponseEntity.ok().body(new RoundResponse(
            roundService.getRoundId(),
            roundService.getTimer(),
            roundService.isBetsOpen()
        ));
    }

    public static class RoundResponse {
        public String roundId;
        public int timer;
        public boolean betsOpen;
        public RoundResponse(String roundId, int timer, boolean betsOpen) {
            this.roundId = roundId;
            this.timer = timer;
            this.betsOpen = betsOpen;
        }
    }

    @PostMapping("/place-bet")
    public ResponseEntity<?> placeBet(@RequestBody BetRequest request) {
        Bet bet = new Bet();
        bet.setFruit(request.fruit);
        bet.setAmount(request.amount);
        bet.setUserId(1L); // TODO: Get from JWT
        bet.setRoundId("demo-round"); // TODO: Use real round
        betService.save(bet);
        auditLogService.log("PLACE_BET", "UserId: 1, Fruit: " + request.fruit + ", Amount: " + request.amount);
        return ResponseEntity.ok().body("Bet placed");
    }

    @GetMapping("/history")
    public ResponseEntity<?> getHistory() {
        // TODO: Return game history
        return ResponseEntity.ok().body(betService.findByUserId(1L));
    }

    // DTOs
    public static class BetRequest {
        public String fruit;
        public int amount;
    }
}
