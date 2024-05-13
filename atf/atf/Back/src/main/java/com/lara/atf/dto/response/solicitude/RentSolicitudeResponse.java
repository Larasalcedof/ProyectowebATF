package com.lara.atf.dto.response.solicitude;

import com.lara.atf.dto.response.property.PropertyResponse;
import com.lara.atf.entity.solicitude.RentSolicitudeStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Builder
public class RentSolicitudeResponse {
    private Long id;
    private String requester;
    private Date timestamp;
    private PropertyResponse property;
    private RentSolicitudeStatus status;
    private Date arrivalDate;
    private Date departureDate;
    private BigDecimal price;
    private Integer peopleQuantity;
}
