package com.unitrade.ai.controller;

import com.unitrade.ai.service.AiProductService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class GeminiController {

    private final AiProductService aiProductService;

    public GeminiController(AiProductService aiProductService) {
        this.aiProductService = aiProductService;
    }

    @PostMapping("/project-assist")
    public Map<String, Object> projectAssist(
            @RequestBody Map<String, String> body) {

        String idea = body.get("idea");

        if (idea == null || idea.isBlank()) {
            throw new RuntimeException("Idea cannot be empty");
        }

        return aiProductService.findMatchingProducts(idea);
    }
}