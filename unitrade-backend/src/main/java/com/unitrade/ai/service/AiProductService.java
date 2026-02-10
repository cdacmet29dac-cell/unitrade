package com.unitrade.ai.service;

import com.unitrade.entity.Product;
import com.unitrade.enums.ProductStatus;
import com.unitrade.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AiProductService {

    private final GeminiService geminiService;
    private final ProductRepository productRepository;

    public AiProductService(GeminiService geminiService,
                            ProductRepository productRepository) {
        this.geminiService = geminiService;
        this.productRepository = productRepository;
    }

    public Map<String, Object> findMatchingProducts(String idea) {

        List<String> keywords =
                geminiService.extractProductKeywords(idea);

        Set<Product> matchedProducts = new HashSet<>();

        for (String keyword : keywords) {
            matchedProducts.addAll(
                    productRepository.searchLiveProducts(
                            ProductStatus.LIVE,
                            keyword.toLowerCase()
                    )
            );
        }

        Map<String, Object> response = new HashMap<>();

        if (matchedProducts.isEmpty()) {
            response.put("products", List.of());
            response.put("suggestedKeywords", keywords);
        } else {
            response.put("products", matchedProducts);
            response.put("suggestedKeywords", List.of());
        }

        return response;
    }
}