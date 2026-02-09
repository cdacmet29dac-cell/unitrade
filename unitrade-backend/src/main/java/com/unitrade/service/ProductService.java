package com.unitrade.service;

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

    // STUDENT: add product
    public Product addProduct(Product product, Long studentId) {

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        User hod = userRepository
                .findByRole_NameAndCollege_IdAndDepartment_Id(
                        "ROLE_HOD",
                        student.getCollege().getId(),
                        student.getDepartment().getId()
                )
                .orElseThrow(() -> new RuntimeException("HOD not found"));

        product.setStudent(student);
        product.setHod(hod);
        product.setStatus(ProductStatus.PENDING_HOD);

        return productRepository.save(product);
    }

    // STUDENT: my products
    public List<Product> getStudentProducts(Long studentId) {
        return productRepository.findByStudent_Id(studentId);
    }

    // MARKETPLACE: live products
    public List<Product> getLiveProducts() {
        return productRepository.findByStatus(ProductStatus.LIVE);
    }

    // HOD: pending products
    public List<Product> getPendingForHod(Long hodId) {
        return productRepository.findByHod_IdAndStatus(hodId, ProductStatus.PENDING_HOD);
    }

    // HOD: approve / reject
    @Transactional
    public Product updateStatus(Long productId, ProductStatus status) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setStatus(status == ProductStatus.APPROVED
                ? ProductStatus.LIVE
                : ProductStatus.REJECTED);

        notificationService.sendWhatsApp(
                product.getStudent().getPhone(),
                "Your product '" + product.getTitle() +
                        "' has been " + product.getStatus()
        );

        return productRepository.save(product);
    }

    // STUDENT: delete
    public void deleteProduct(Long productId, Long studentId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!product.getStudent().getId().equals(studentId)) {
            throw new RuntimeException("Unauthorized");
        }

        productRepository.delete(product);
    }
}