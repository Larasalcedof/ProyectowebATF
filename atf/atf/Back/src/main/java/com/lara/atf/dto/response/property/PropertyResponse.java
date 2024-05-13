package com.lara.atf.dto.response.property;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class PropertyResponse {
    private Long id;
    private String name;
    private String department;
    private String city;
    private String description;
    private UUID img;
    private Integer peopleQuantity;
    private BigDecimal price;
}
