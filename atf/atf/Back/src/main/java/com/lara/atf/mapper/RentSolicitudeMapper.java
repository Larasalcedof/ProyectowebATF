package com.lara.atf.mapper;

import com.lara.atf.dto.response.solicitude.RentSolicitudeResponse;
import com.lara.atf.entity.solicitude.RentSolicitude;
import lombok.val;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {
        PropertyMapper.class
})
public interface RentSolicitudeMapper {

    @Mapping(target = "requester", expression = "java(getPropertyLandlordFullName(solicitude))")
    RentSolicitudeResponse modelToResponse(RentSolicitude solicitude);


    default String getPropertyLandlordFullName(RentSolicitude rentSolicitude){
        val user = rentSolicitude.getProperty().getUser();
        return user.getName() + " " + user.getSurname();
    }
}
