package com.lara.atf.service;

import com.lara.atf.dto.request.SearchRequest;
import com.lara.atf.dto.request.property.PropertyDisableRequest;
import com.lara.atf.dto.request.property.PropertyRequest;
import com.lara.atf.dto.request.property.PropertyUpdateRequest;
import com.lara.atf.dto.response.property.PropertyDetailedResponse;
import com.lara.atf.dto.response.property.PropertyResponse;
import com.lara.atf.entity.property.Property;
import com.lara.atf.entity.property.PropertyImage;
import com.lara.atf.mapper.PropertyMapper;
import com.lara.atf.repository.PropertyImageRepository;
import com.lara.atf.repository.PropertyRepository;
import com.lara.atf.service.auth.AuthService;
import jakarta.transaction.Transactional;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Base64;
import java.util.UUID;

@Service
public class PropertyService {
    private static final Integer MAX_PROPERTIES_PER_REQUEST = 20;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private PropertyImageRepository propertyImageRepository;

    @Autowired
    private PropertyMapper propertyMapper;

    @Autowired
    private AuthService authService;

    @Transactional
    public Long createProperty(String email, PropertyRequest request, MultipartFile file){
        val user = this.authService.getUserByEmail(email);
        try{
            val property = propertyMapper.requestToModel(request);
            property.setEnabled(true);
            val img = PropertyImage.builder()
                    .data(Base64.getEncoder().encodeToString(file.getBytes()))
                    .imageName(UUID.randomUUID())
                    .build();

            val imgSave = this.propertyImageRepository.save(img);
            property.setImage(
                    imgSave
            );
            property.setUser(user);
            return this.propertyRepository.save(property).getId();
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    public void updateProperty(String email, PropertyUpdateRequest request) {
        val user = authService.getUserByEmail(email);
        val property = this.propertyRepository.findById(request.getId()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "The property could not be found"));

        if(!user.getId().equals(property.getUser().getId())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "The user is not authorized to edit this property");
        }
        propertyMapper.updatePropertyFromRequest(request, property);
        this.propertyRepository.save(property);
    }

    public Iterable<PropertyResponse> listProperties() {
        return this.propertyRepository.getRandomProperties(Pageable.ofSize(MAX_PROPERTIES_PER_REQUEST))
                .stream().map(propertyMapper::modelToResponse)
                .toList();
    }

    @Transactional
    public void disableProperty(String email, PropertyDisableRequest request){
        val user = this.authService.getUserByEmail(email);
        val property = this.propertyRepository.findById(request.getId()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "The property could not be found"));

        if (!property.getUser().getId().equals(user.getId())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "The user has not authorization to edit this property");
        }
        property.setEnabled(false);
    }

    public Iterable<PropertyResponse> search(SearchRequest request){
        Specification<Property> searchParams = (root, _, cb) -> {

            var predicate = cb.conjunction();

            if(request.getName() != null){
                predicate = cb.and(predicate, cb.like(root.get("name"), "%"+request.getName()+"%"));
            }

            if(request.getCity() != null){
                predicate = cb.and(predicate, cb.like(root.get("city"), "%"+request.getCity()+"%"));
            }

            if(request.getPeopleQuantity() != null && request.getPeopleQuantity() > 0 ){
                predicate = cb.and(predicate, cb.greaterThanOrEqualTo(root.get("peopleQuantity"), request.getPeopleQuantity()));
            }

            predicate = cb.and(predicate, cb.isTrue(root.get("enabled")));

            return predicate;
        };

        return this.propertyRepository.findAll(searchParams).stream()
                .map(propertyMapper::modelToResponse)
                .toList();
    }

    public Iterable<PropertyResponse> getLandlordProperties(String email){
        val user = this.authService.getUserByEmail(email);
        return this.propertyRepository.findLandLordProperties(user.getId())
                .stream().map(propertyMapper::modelToResponse)
                .toList();
    }

    protected Property getById(Long id){
        return this.propertyRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public PropertyDetailedResponse getByIdResponse(Long id){
        return this.propertyRepository.findById(id)
                .map(propertyMapper::modelToResponseDetailed)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
