package com.unitrade.repository;

import com.unitrade.entity.Product;
import com.unitrade.enums.ProductStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
	
	@Query("""
	        SELECT p FROM Product p
	        WHERE p.status = :status
	        AND (
	            LOWER(p.title) LIKE %:keyword%
	            OR LOWER(p.description) LIKE %:keyword%
	        )
	    """)
	    List<Product> searchLiveProducts(ProductStatus status, String keyword);

    List<Product> findByStatus(ProductStatus status);

    List<Product> findByHod_IdAndStatus(Long hodId, ProductStatus status);

    List<Product> findByStudent_Id(Long studentId);
}