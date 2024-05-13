package com.lara.atf.dto.request.rate;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RateRequest {
    @NotNull
    private Long rentSolicitudeId;

    @NotNull
    @NotBlank
    private String comment;

    @NotNull
    @Min(value = 0)
    @Max(value = 5)
    private Double propertyRating;

    @NotNull
    @Min(value = 0)
    @Max(value = 5)
    private Double landlordRating;

}
