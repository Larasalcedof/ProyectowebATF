package com.lara.atf.dto.request.solicitude;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class RentSolicitudeRequest {
    @NotNull
    private Long propertyId;
    @NotNull
    private Date arrivalDate;
    @NotNull
    private Date departureDate;
    @NotNull
    private Integer peopleQuantity;
}
