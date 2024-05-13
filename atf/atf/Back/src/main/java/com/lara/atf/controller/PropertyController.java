package com.lara.atf.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lara.atf.controller.internal.AuthExtractor;
import com.lara.atf.dto.request.SearchRequest;
import com.lara.atf.dto.request.property.PropertyDisableRequest;
import com.lara.atf.dto.request.property.PropertyRequest;
import com.lara.atf.dto.request.property.PropertyUpdateRequest;
import com.lara.atf.dto.response.property.PropertyDetailedResponse;
import com.lara.atf.dto.response.property.PropertyResponse;
import com.lara.atf.service.PropertyService;
import jakarta.validation.Valid;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/property")
@Validated
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private AuthExtractor authExtractor;

    @Autowired
    private ObjectMapper objectMapper;

    //HUA.5-7
    @PreAuthorize("hasRole('LANDLORD')")
    @PostMapping(value = "/create", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_OCTET_STREAM_VALUE})
    public ResponseEntity<Object> createProperty(@RequestPart("file") MultipartFile file, @RequestPart("json") String request) throws JsonProcessingException {
        val id = this.propertyService.createProperty(authExtractor.extractAuth().getUsername(),
                this.objectMapper.readValue(request, PropertyRequest.class),
                file);
        val uri = ServletUriComponentsBuilder.fromPath("/property")
                .path("/{id}")
                .buildAndExpand(id)
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    //HUA.6
    @PreAuthorize("hasRole('LANDLORD')")
    @PutMapping("/update")
    public ResponseEntity<Object> updateProperty(@Valid @RequestBody PropertyUpdateRequest request){
        this.propertyService.updateProperty(authExtractor.extractAuth().getUsername(), request);
        return ResponseEntity.accepted().build();
    }

    //HUA.4
    @GetMapping("/list")
    public Iterable<PropertyResponse> listRandomProperties(){
        return this.propertyService.listProperties();
    }

    @PreAuthorize("hasRole('LANDLORD')")
    @GetMapping("/list-landlord")
    public Iterable<PropertyResponse> listLandlordProperties(){
        return this.propertyService.getLandlordProperties(authExtractor.extractAuth().getUsername());
    }

    @GetMapping("/details/{id}")
    public PropertyDetailedResponse getPropertyById(@PathVariable("id")Long id){
        return this.propertyService.getByIdResponse(id);
    }

    //HUA.8
    @PreAuthorize("hasRole('LANDLORD')")
    @DeleteMapping("/disable")
    public ResponseEntity<Object> disableProperty(@Valid @RequestBody PropertyDisableRequest request){
        this.propertyService.disableProperty(authExtractor.extractAuth().getUsername(), request);
        return ResponseEntity.accepted().build();
    }

    //HUA.16
    @PostMapping("/search")
    public Iterable<PropertyResponse> search(@RequestBody SearchRequest request){
        return this.propertyService.search(request);
    }
}
