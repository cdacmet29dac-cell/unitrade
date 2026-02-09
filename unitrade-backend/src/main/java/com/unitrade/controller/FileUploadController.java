package com.unitrade.controller;

import com.unitrade.entity.StudentVerification;
import com.unitrade.repository.StudentVerificationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * Handles ID card upload.
 */
@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    @Value("${file.upload.dir}")
    private String uploadDir;

    private final StudentVerificationRepository verificationRepository;

    public FileUploadController(StudentVerificationRepository verificationRepository) {
        this.verificationRepository = verificationRepository;
    }

    @PostMapping("/upload/{verificationId}")
    public String uploadIdCard(
            @PathVariable Long verificationId,
            @RequestParam("file") MultipartFile file) throws IOException {

        StudentVerification verification =
                verificationRepository.findById(verificationId)
                        .orElseThrow(() -> new RuntimeException("Verification not found"));

        // Create folder if not exists
        File dir = new File(uploadDir + "/id-cards");
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // 🔐 Unique file name
        String uniqueFileName =
                verificationId + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();

        String filePath = uploadDir + "/id-cards/" + uniqueFileName;

        // Save file
        file.transferTo(new File(filePath));

        // Save relative path
        verification.setIdCardPath("id-cards/" + uniqueFileName);
        verificationRepository.save(verification);

        return "ID card uploaded successfully";
    }
    
    @PostMapping("/upload/product")
    public String uploadProductImage(@RequestParam("file") MultipartFile file)
            throws IOException {

        File dir = new File(uploadDir + "/products");
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String uniqueName =
                System.currentTimeMillis() + "_" + file.getOriginalFilename();

        String filePath = uploadDir + "/products/" + uniqueName;

        file.transferTo(new File(filePath));

        // return RELATIVE path
        return "products/" + uniqueName;
    }
}