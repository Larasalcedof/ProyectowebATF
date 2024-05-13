package com.lara.atf.service;

import com.lara.atf.dto.request.rate.RateRequest;
import com.lara.atf.entity.solicitude.RentSolicitudeStatus;
import com.lara.atf.mapper.RateMapper;
import com.lara.atf.repository.RatingRepository;
import jakarta.transaction.Transactional;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private RentSolicitudeService rentSolicitudeService;

    @Autowired
    private RateMapper rateMapper;

    @Transactional
    public void rate(RateRequest request){
        val solicitude = this.rentSolicitudeService.getById(request.getRentSolicitudeId());
        val rate = rateMapper.requestToModel(request);
        rate.setProperty(solicitude.getProperty());
        this.ratingRepository.save(rate);
        solicitude.setStatus(RentSolicitudeStatus.FINALIZED);
        this.rentSolicitudeService.saveSolicitude(solicitude);
    }
}
