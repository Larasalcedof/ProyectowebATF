package com.lara.atf.service.auth;

import com.lara.atf.dto.request.auth.LoginRequest;
import com.lara.atf.dto.request.auth.SignUpRequest;
import com.lara.atf.dto.response.auth.LoginResponse;
import com.lara.atf.entity.user.User;
import com.lara.atf.mapper.UserMapper;
import com.lara.atf.repository.UserRepository;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
public class AuthService {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    public LoginResponse login(LoginRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        val user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        return LoginResponse.builder()
                .token(this.jwtService.generateToken(
                        Map.of("ENABLED", user.getEnabled(), "TYPE", user.getType()),
                        user
                ))
                .build();
    }

    public LoginResponse register(SignUpRequest request) {
        val user = userMapper.requestToModel(request);
        user.setEnabled(false);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        try {
            this.userRepository.save(user);
        }catch (DataIntegrityViolationException e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "The email is already exists");
        }
        var jwtToken = jwtService.generateToken(
                Map.of("ENABLED", user.getEnabled(), "TYPE", user.getType()),
                user
        );

        return LoginResponse.builder()
                .token(jwtToken)
                .build();
    }

    public User getUserByEmail(String email){
        return this.userRepository.findByEmail(email).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public void activateAccount(String email){
        val user = this.userRepository.findByEmail(email).orElseThrow();
        user.setEnabled(true);
        this.userRepository.save(user);
    }
}
