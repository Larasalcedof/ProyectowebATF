package com.lara.atf.controller;

import com.lara.atf.repository.PropertyImageRepository;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("/files")
public class FileController {

    @Autowired
    private PropertyImageRepository fileRepository;

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> serveFile(@PathVariable("id") UUID filename) {
        val entity = this.fileRepository.getByUUID(filename).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        byte[] imageBytes = java.util.Base64.getDecoder().decode(entity.getData());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }
}
