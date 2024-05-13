package com.lara.atf.dto.request.property;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PropertyDisableRequest {
    @NotNull
    @Min(value = 0)
    private Long id;
}
