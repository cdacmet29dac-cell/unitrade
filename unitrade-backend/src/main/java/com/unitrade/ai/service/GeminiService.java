package com.unitrade.ai.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Extract product keywords from idea using Gemini AI
     */
    public List<String> extractProductKeywords(String idea) {

        // 🔒 STRICT PROMPT (NO MARKDOWN)
        String prompt = """
        Extract product-related keywords from the idea below.

        Respond ONLY with valid JSON.
        No markdown.
        No explanation.
        No backticks.

        Format:
        {
          "keywords": ["keyword1", "keyword2"]
        }

        Idea:
        """ + idea;

        String url =
                "https://generativelanguage.googleapis.com/v1beta/models/" +
                "gemini-2.5-flash:generateContent?key=" + apiKey;

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of(
                                "parts", List.of(
                                        Map.of("text", prompt)
                                )
                        )
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(body, headers);

        ResponseEntity<Map> response =
                restTemplate.postForEntity(url, entity, Map.class);

        // 🔹 Extract Gemini text safely
        List<Map<String, Object>> candidates =
                (List<Map<String, Object>>) response.getBody().get("candidates");

        Map<String, Object> content =
                (Map<String, Object>) candidates.get(0).get("content");

        List<Map<String, Object>> parts =
                (List<Map<String, Object>>) content.get("parts");

        String rawText = parts.get(0).get("text").toString();

        // 🔐 CLEAN JSON (CRITICAL STEP)
        String cleanJson = extractPureJson(rawText);

        try {
            Map<String, Object> parsed =
                    objectMapper.readValue(cleanJson, Map.class);

            return (List<String>) parsed.get("keywords");

        } catch (Exception e) {
            throw new RuntimeException(
                    "Invalid JSON from Gemini: " + cleanJson, e
            );
        }
    }

    /**
     * Removes markdown / explanation and extracts JSON block only
     */
    private String extractPureJson(String text) {

        int start = text.indexOf("{");
        int end = text.lastIndexOf("}");

        if (start == -1 || end == -1 || start > end) {
            throw new RuntimeException("No valid JSON found in Gemini response");
        }

        return text.substring(start, end + 1);
    }
}