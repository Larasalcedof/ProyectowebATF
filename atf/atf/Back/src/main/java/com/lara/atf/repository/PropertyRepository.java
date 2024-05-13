package com.lara.atf.repository;

import com.lara.atf.entity.property.Property;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;


@Repository
public interface PropertyRepository extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property> {

    @Query(value = "SELECT p FROM Property p WHERE p.enabled = true ORDER BY RAND()")
    Page<Property> getRandomProperties(Pageable pageable);

    @Query(value = "SELECT p FROM Property p JOIN p.user u WHERE u.id = :id AND p.enabled = true")
    Collection<Property> findLandLordProperties(@Param("id") Long id);
}
