package com.lara.atf.controller;

import com.lara.atf.dto.request.auth.LoginRequest;
import com.lara.atf.dto.request.auth.SignUpRequest;
import com.lara.atf.dto.response.auth.LoginResponse;
import com.lara.atf.service.auth.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Validated
public class AuthController {
    @Autowired
    private AuthService authService;

    //HUA.3
    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest loginRequest){
        return authService.login(loginRequest);
    }

    //HUA.1
    @PostMapping("/signup")
    public LoginResponse signUp(@Valid @RequestBody SignUpRequest signUpRequest){
        return this.authService.register(signUpRequest);
    }

}
