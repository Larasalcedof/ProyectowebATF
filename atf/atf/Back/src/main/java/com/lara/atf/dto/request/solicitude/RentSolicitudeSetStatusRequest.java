package com.lara.atf.dto.request.solicitude;

import com.lara.atf.entity.solicitude.RentSolicitudeStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RentSolicitudeSetStatusRequest {
    @NotNull
    private Long id;
    @NotNull
    private RentSolicitudeStatus status;
}
