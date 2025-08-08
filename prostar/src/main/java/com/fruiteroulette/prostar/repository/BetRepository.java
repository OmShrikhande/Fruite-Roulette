package com.fruiteroulette.prostar.repository;

import com.fruiteroulette.prostar.model.Bet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BetRepository extends JpaRepository<Bet, Long> {
    List<Bet> findByRoundId(String roundId);
    List<Bet> findByUserId(Long userId);
}
