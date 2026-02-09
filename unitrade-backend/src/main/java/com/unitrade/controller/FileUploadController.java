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

        // Full file path
        String filePath = uploadDir + "/id-cards/" + file.getOriginalFilename();

        // Save file
        file.transferTo(new File(filePath));

        // Save RELATIVE path in DB (important)
        verification.setIdCardPath("id-cards/" + file.getOriginalFilename());
        verificationRepository.save(verification);

        return "ID card uploaded successfully";
    }
}
