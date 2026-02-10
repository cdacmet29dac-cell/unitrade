package com.unitrade.service;

import com.unitrade.dto.ProductRequest;
import com.unitrade.entity.Product;
import com.unitrade.entity.User;
import com.unitrade.enums.ProductStatus;
import com.unitrade.repository.ProductRepository;
import com.unitrade.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public ProductService(ProductRepository productRepository,
                          UserRepository userRepository,
                          NotificationService notificationService) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    // ================= STUDENT =================

    public Product addProduct(ProductRequest request, Long studentId) {

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        User hod = userRepository
                .findByRole_NameAndCollege_IdAndDepartment_Id(
                        "ROLE_HOD",
                        student.getCollege().getId(),
                        student.getDepartment().getId()
                )
                .orElseThrow(() -> new RuntimeException("HOD not found"));

        Product product = new Product();
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());

        // ✅ save image paths (comma separated)
        product.setImages(String.join(",", request.getImages()));

        product.setStudent(student);
        product.setHod(hod);
        product.setStatus(ProductStatus.PENDING_HOD);

        return productRepository.save(product);
    }

    public List<Product> getStudentProducts(Long studentId) {
        return productRepository.findByStudent_Id(studentId);
    }

    public void deleteProduct(Long productId, Long studentId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!product.getStudent().getId().equals(studentId)) {
            throw new RuntimeException("Unauthorized");
        }

        productRepository.delete(product);
    }

    // ================= MARKETPLACE =================

    public List<Product> getLiveProducts() {
        return productRepository.findByStatus(ProductStatus.LIVE);
    }

    // ================= HOD =================

    public List<Product> getPendingForHod(Long hodId) {
        return productRepository.findByHod_IdAndStatus(
                hodId, ProductStatus.PENDING_HOD
        );
    }

    @Transactional
    public Product updateStatus(Long productId, ProductStatus status) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (status != ProductStatus.LIVE && status != ProductStatus.REJECTED) {
            throw new RuntimeException("Invalid status");
        }

        product.setStatus(status);

        // 🔔 WhatsApp notification
        notificationService.sendWhatsApp(
                product.getStudent().getPhone(),
                "Your product '" + product.getTitle() + "' is now " + status
        );

        return productRepository.save(product);
    }
}
