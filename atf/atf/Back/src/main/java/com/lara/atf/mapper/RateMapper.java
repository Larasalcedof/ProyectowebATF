package com.lara.atf.mapper;

import com.lara.atf.dto.request.rate.RateRequest;
import com.lara.atf.entity.rating.Rating;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RateMapper {

    Rating requestToModel(RateRequest request);
}
