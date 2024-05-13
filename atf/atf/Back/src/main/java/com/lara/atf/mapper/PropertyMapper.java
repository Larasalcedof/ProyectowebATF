package com.lara.atf.mapper;

import com.lara.atf.dto.request.property.PropertyRequest;
import com.lara.atf.dto.request.property.PropertyUpdateRequest;
import com.lara.atf.dto.response.property.PropertyDetailedResponse;
import com.lara.atf.dto.response.property.PropertyResponse;
import com.lara.atf.entity.property.Property;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.UUID;

@Mapper(componentModel = "spring")
public interface PropertyMapper {

    Property requestToModel(PropertyRequest request);

    @Mapping(target = "id", ignore = true)
    void updatePropertyFromRequest(PropertyUpdateRequest request, @MappingTarget Property property);

    @Mapping(target = "img", expression = "java(getStringName(property))")
    PropertyResponse modelToResponse(Property property);

    @Mapping(target = "img", expression = "java(getStringName(property))")
    PropertyDetailedResponse modelToResponseDetailed(Property property);


    default UUID getStringName(Property property){
        return property.getImage().getImageName();
    }
}
