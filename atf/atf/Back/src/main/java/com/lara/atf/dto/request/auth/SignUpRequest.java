package com.lara.atf.dto.request.auth;

import com.lara.atf.entity.user.UserType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SignUpRequest {

    @NotNull
    @NotBlank
    private String email;

    @NotNull
    @NotBlank
    private String name;

    @NotNull
    @NotBlank
    private String surname;

    @NotNull
    @NotBlank
    private String password;

    @NotNull
    @NotBlank
    private String tel;

    @NotNull
    private UserType type;
}
