package com.lara.atf.dto.request.property;

import com.lara.atf.entity.property.PropertyIngressType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PropertyRequest {
    @NotNull
    @NotBlank
    private String name;

    @NotNull
    @NotBlank
    private String department;

    @NotNull
    @NotBlank
    private String city;

    @NotNull
    private PropertyIngressType ingressType;

    @NotNull
    @NotBlank
    private String description;

    @NotNull
    @Min(value = 0)
    private Integer peopleQuantity;

    @NotNull
    @Min(value = 0)
    private Integer bathRoomQuantity;

    @NotNull
    private Boolean arePetsAllowed;

    @NotNull
    private Boolean hasPool;

    @NotNull
    private Boolean hasBBQ;

    @NotNull
    @Min(value = 0)
    private BigDecimal price;
}
