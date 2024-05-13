package com.lara.atf.dto.request.property;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class PropertyUpdateRequest extends PropertyRequest{
    @NotNull
    private Long id;
}
