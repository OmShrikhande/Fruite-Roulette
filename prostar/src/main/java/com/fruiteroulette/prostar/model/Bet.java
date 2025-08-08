package com.fruiteroulette.prostar.model;

import jakarta.persistence.*;

@Entity
public class Bet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fruit;
    private int amount;
    private Long userId;
    private String roundId;
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFruit() { return fruit; }
    public void setFruit(String fruit) { this.fruit = fruit; }
    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getRoundId() { return roundId; }
    public void setRoundId(String roundId) { this.roundId = roundId; }
}
