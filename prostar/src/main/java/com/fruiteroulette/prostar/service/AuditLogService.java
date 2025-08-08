package com.fruiteroulette.prostar.service;

import com.fruiteroulette.prostar.model.AuditLog;
import com.fruiteroulette.prostar.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuditLogService {
    @Autowired
    private AuditLogRepository auditLogRepository;

    public AuditLog log(String action, String details) {
        AuditLog log = new AuditLog();
        log.setAction(action);
        log.setDetails(details);
        return auditLogRepository.save(log);
    }
}
