package com.lara.atf.repository;

import com.lara.atf.entity.property.PropertyImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface PropertyImageRepository extends JpaRepository<PropertyImage, Long> {

    @Query(value = "SELECT i FROM PropertyImage i WHERE i.imageName = :uuid")
    Optional<PropertyImage> getByUUID(@Param("uuid")UUID uuid);
}
