package com.fruiteroulette.prostar.service;

import org.springframework.stereotype.Service;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class RoundService {
    private AtomicInteger timer = new AtomicInteger(30);
    private String roundId = "demo-round";
    private boolean betsOpen = true;

    public String getRoundId() { return roundId; }
    public int getTimer() { return timer.get(); }
    public boolean isBetsOpen() { return betsOpen; }

    // Simulate timer countdown (should be scheduled in production)
    public void tick() {
        if (timer.get() > 0) {
            timer.decrementAndGet();
        } else {
            betsOpen = false;
        }
    }

    public void resetRound() {
        timer.set(30);
        betsOpen = true;
        roundId = "demo-round" + System.currentTimeMillis();
    }
}
