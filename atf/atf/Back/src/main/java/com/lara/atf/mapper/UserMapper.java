package com.lara.atf.mapper;

import com.lara.atf.dto.request.auth.SignUpRequest;
import com.lara.atf.entity.user.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User requestToModel(SignUpRequest request);
}
