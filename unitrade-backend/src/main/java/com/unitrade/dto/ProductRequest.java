package com.unitrade.dto;

import java.util.List;

public class ProductRequest {

    private String title;
    private String description;
    private double price;
    private List<String> images;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }
}
