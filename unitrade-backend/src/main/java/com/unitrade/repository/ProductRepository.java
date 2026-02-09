package com.unitrade.repository;

import com.unitrade.entity.Product;
import com.unitrade.enums.ProductStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByStatus(ProductStatus status);

    List<Product> findByHod_IdAndStatus(Long hodId, ProductStatus status);

    List<Product> findByStudent_Id(Long studentId);
}