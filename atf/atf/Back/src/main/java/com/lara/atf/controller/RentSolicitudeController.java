package com.lara.atf.controller;

import com.lara.atf.controller.internal.AuthExtractor;
import com.lara.atf.dto.request.solicitude.RentSolicitudePayRequest;
import com.lara.atf.dto.request.solicitude.RentSolicitudeRequest;
import com.lara.atf.dto.request.solicitude.RentSolicitudeSetStatusRequest;
import com.lara.atf.dto.response.solicitude.RentSolicitudeResponse;
import com.lara.atf.service.RentSolicitudeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/solicitude")
@Validated
public class RentSolicitudeController {

    @Autowired
    private RentSolicitudeService rentSolicitudeService;

    @Autowired
    private AuthExtractor authExtractor;

    // HUA.9
    @PreAuthorize("hasRole('LANDLORD')")
    @GetMapping("/landlord")
    public Iterable<RentSolicitudeResponse> getLandlordSolicitudes(){
        return this.rentSolicitudeService.getLandlordSolicitudes(authExtractor.extractAuth().getUsername());
    }

    // HUA.18
    @PreAuthorize("hasRole('TENANT')")
    @GetMapping("/user")
    public Iterable<RentSolicitudeResponse> getUserSolicitudes(){
        return this.rentSolicitudeService.getUserSolicitudes(authExtractor.extractAuth().getUsername());
    }

    // HUA.10-11
    @PostMapping("/set")
    public ResponseEntity<Object> setSolicitudeStatus(@Valid @RequestBody RentSolicitudeSetStatusRequest request){
        this.rentSolicitudeService.setSolicitudeStatus(request);
        return ResponseEntity.accepted().build();
    }

    //HUA.17
    @PostMapping("/create")
    public ResponseEntity<Object> createSolicitude(@Valid @RequestBody RentSolicitudeRequest request){
        this.rentSolicitudeService.create(authExtractor.extractAuth().getUsername(),request);
        return ResponseEntity.ok().build();
    }

    //HUA.19
    @PreAuthorize("hasRole('TENANT')")
    @PostMapping("/pay")
    public void paySolicitude(@Valid @RequestBody RentSolicitudePayRequest request){
        this.rentSolicitudeService.pay(request);
    }
}
