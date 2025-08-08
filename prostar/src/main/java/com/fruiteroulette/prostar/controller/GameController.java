package com.fruiteroulette.prostar.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.fruiteroulette.prostar.model.Bet;
import com.fruiteroulette.prostar.service.BetService;

@RestController
@RequestMapping("/game")
public class GameController {
    @Autowired
    private BetService betService;
    @GetMapping("/current-round")
    public ResponseEntity<?> getCurrentRound() {
        // TODO: Return current round state
        return ResponseEntity.ok().body("Current round (stub)");
    }

    @PostMapping("/place-bet")
    public ResponseEntity<?> placeBet(@RequestBody BetRequest request) {
        Bet bet = new Bet();
        bet.setFruit(request.fruit);
        bet.setAmount(request.amount);
        bet.setUserId(1L); // TODO: Get from JWT
        bet.setRoundId("demo-round"); // TODO: Use real round
        betService.save(bet);
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
