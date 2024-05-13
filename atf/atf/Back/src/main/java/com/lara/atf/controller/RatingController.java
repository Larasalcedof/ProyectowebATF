package com.lara.atf.controller;

import com.lara.atf.dto.request.rate.RateRequest;
import com.lara.atf.service.RatingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rating")
@Validated
public class RatingController {

    @Autowired
    private RatingService ratingService;

    //HUA.12-20
    @PreAuthorize("hasRole('TENANT')")
    @PostMapping("/create")
    public ResponseEntity<Object> rate(@Valid @RequestBody RateRequest request){
        this.ratingService.rate(request);
        return ResponseEntity.ok().build();
    }

}
