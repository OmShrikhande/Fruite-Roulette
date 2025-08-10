package com.fruiteroulette.prostar.repository;

import com.fruiteroulette.prostar.model.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {}
