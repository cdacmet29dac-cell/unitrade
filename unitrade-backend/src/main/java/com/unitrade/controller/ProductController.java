package com.unitrade.controller;

import com.unitrade.entity.Product;
import com.unitrade.enums.ProductStatus;
import com.unitrade.service.ProductService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

 // STUDENT: add product
    @PostMapping("/student/{studentId}")
    @PreAuthorize("hasAuthority('ROLE_STUDENT')")
    public Product addProduct(@PathVariable Long studentId,
                              @RequestBody Product product) {
        return productService.addProduct(product, studentId);
    }

    // STUDENT: my products
    @GetMapping("/student/{studentId}")
    public List<Product> myProducts(@PathVariable Long studentId) {
        return productService.getStudentProducts(studentId);
    }

 // MARKETPLACE (STUDENT + ADMIN)
    @GetMapping("/live")
    @PreAuthorize("hasAnyAuthority('ROLE_STUDENT','ROLE_ADMIN')")
    public List<Product> liveProducts() {
        return productService.getLiveProducts();
    }

    // HOD: pending
    @GetMapping("/hod/{hodId}")
    public List<Product> pendingForHod(@PathVariable Long hodId) {
        return productService.getPendingForHod(hodId);
    }

 // HOD: approve/reject
    @PutMapping("/{productId}/status")
    @PreAuthorize("hasAuthority('ROLE_HOD')")
    public Product updateStatus(@PathVariable Long productId,
                                @RequestParam ProductStatus status) {
        return productService.updateStatus(productId, status);
    }

    // STUDENT: delete
    @DeleteMapping("/{productId}/student/{studentId}")
    public void deleteProduct(@PathVariable Long productId,
                              @PathVariable Long studentId) {
        productService.deleteProduct(productId, studentId);
    }
}