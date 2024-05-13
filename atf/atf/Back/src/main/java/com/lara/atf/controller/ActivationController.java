package com.lara.atf.controller;

import com.lara.atf.controller.internal.AuthExtractor;
import com.lara.atf.service.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/activate")
public class ActivationController {
    @Autowired
    private AuthExtractor authExtractor;
    @Autowired
    private AuthService authService;

    //HUA.2-14
    @PostMapping
    public ResponseEntity<Object> activateAccount(){
        this.authService.activateAccount(this.authExtractor.extractAuth().getUsername());
        return ResponseEntity.ok().build();
    }
}
