package com.lara.atf.service;

import com.lara.atf.dto.request.solicitude.RentSolicitudePayRequest;
import com.lara.atf.dto.request.solicitude.RentSolicitudeRequest;
import com.lara.atf.dto.request.solicitude.RentSolicitudeSetStatusRequest;
import com.lara.atf.dto.response.solicitude.RentSolicitudeResponse;
import com.lara.atf.entity.property.Property;
import com.lara.atf.entity.solicitude.RentSolicitude;
import com.lara.atf.entity.solicitude.RentSolicitudeStatus;
import com.lara.atf.mapper.RentSolicitudeMapper;
import com.lara.atf.repository.SolicitudeRepository;
import com.lara.atf.service.auth.AuthService;
import jakarta.transaction.Transactional;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;

@Service
public class RentSolicitudeService {
    @Autowired
    private SolicitudeRepository solicitudeRepository;

    @Autowired
    private RentSolicitudeMapper rentSolicitudeMapper;

    @Autowired
    private AuthService authService;

    @Autowired
    private PropertyService propertyService;

    public Iterable<RentSolicitudeResponse> getLandlordSolicitudes(String email){
        val user = authService.getUserByEmail(email);
        val solicitudes = this.solicitudeRepository.getRentSolicitudesByLandlordId(user.getId());
        return solicitudes.stream().map(rentSolicitudeMapper::modelToResponse)
                .toList();
    }

    public Iterable<RentSolicitudeResponse> getUserSolicitudes(String email){
        val user = authService.getUserByEmail(email);
        val solicitudes = this.solicitudeRepository.getRentSolicitudesByUserId(user.getId());
        return solicitudes.stream().map(rentSolicitudeMapper::modelToResponse)
                .toList();
    }

    @Transactional
    public void setSolicitudeStatus(RentSolicitudeSetStatusRequest request){
        val solicitude = this.solicitudeRepository.findById(request.getId()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "The solicitude could not be found"));
        solicitude.setStatus(request.getStatus());
    }

    @Transactional
    public void create(String email, RentSolicitudeRequest request) {
        val user = this.authService.getUserByEmail(email);
        val property = this.propertyService.getById(request.getPropertyId());
        val solicitude = RentSolicitude.builder()
                .applicant(user)
                .property(property)
                .arrivalDate(request.getArrivalDate())
                .departureDate(request.getDepartureDate())
                .status(RentSolicitudeStatus.TO_BE_ACCEPTED)
                .timestamp(new Date())
                .price(property.getPrice())
                .peopleQuantity(request.getPeopleQuantity())
                .build();
        this.solicitudeRepository.save(solicitude);
    }

    @Transactional
    public void pay(RentSolicitudePayRequest request) {
        val solicitude = this.solicitudeRepository.findById(request.getId()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND));

        solicitude.setStatus(RentSolicitudeStatus.PAID);
        this.solicitudeRepository.save(solicitude);
    }

    protected RentSolicitude getById(Long id){
        return this.solicitudeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    protected void saveSolicitude(RentSolicitude solicitude){
        this.solicitudeRepository.save(solicitude);
    }
}
