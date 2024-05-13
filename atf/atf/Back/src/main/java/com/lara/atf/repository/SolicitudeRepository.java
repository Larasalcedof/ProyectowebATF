package com.lara.atf.repository;

import com.lara.atf.entity.solicitude.RentSolicitude;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface SolicitudeRepository extends JpaRepository<RentSolicitude, Long> {

    @Query(value = "SELECT r FROM RentSolicitude r JOIN r.property p JOIN p.user u WHERE u.id = :id")
    Collection<RentSolicitude> getRentSolicitudesByLandlordId(@Param("id")Long id);

    @Query(value = "SELECT r FROM RentSolicitude r JOIN r.applicant a WHERE a.id = :id")
    Collection<RentSolicitude> getRentSolicitudesByUserId(@Param("id") Long id);

}
