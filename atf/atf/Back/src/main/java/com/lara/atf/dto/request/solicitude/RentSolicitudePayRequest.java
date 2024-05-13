package com.lara.atf.dto.request.solicitude;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RentSolicitudePayRequest {
    @NotNull
    private Long id;
    @NotNull
    @NotBlank
    private String bank;
}
