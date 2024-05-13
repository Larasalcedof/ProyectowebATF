package com.lara.atf.dto.response.property;

import com.lara.atf.entity.property.PropertyIngressType;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class PropertyDetailedResponse{
    private Long id;
    private String name;
    private String department;
    private String city;
    private String description;
    private UUID img;
    private Integer peopleQuantity;
    private BigDecimal price;
    private PropertyIngressType ingressType;
    private Integer bathRoomQuantity;
    private Boolean arePetsAllowed;
    private Boolean hasPool;
    private Boolean hasBBQ;
}
