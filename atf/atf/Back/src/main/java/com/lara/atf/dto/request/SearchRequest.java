package com.lara.atf.dto.request;

import lombok.Data;

@Data
public class SearchRequest {
    private String name;
    private String city;
    private Integer peopleQuantity;
}
