package com.fruiteroulette.prostar.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    @MessageMapping("/game/updates")
    @SendTo("/topic/game")
    public String broadcastGameUpdate(String message) {
        // TODO: Implement real-time game updates
        return message;
    }
}
