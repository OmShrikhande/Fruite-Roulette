package com.fruiteroulette.prostar.service;

import com.fruiteroulette.prostar.model.Bet;
import com.fruiteroulette.prostar.repository.BetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BetService {
    @Autowired
    private BetRepository betRepository;

    public Bet save(Bet bet) {
        return betRepository.save(bet);
    }

    public List<Bet> findByRoundId(String roundId) {
        return betRepository.findByRoundId(roundId);
    }

    public List<Bet> findByUserId(Long userId) {
        return betRepository.findByUserId(userId);
    }
}
