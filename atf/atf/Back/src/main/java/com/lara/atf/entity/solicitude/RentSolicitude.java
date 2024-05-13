package com.lara.atf.entity.solicitude;

import com.lara.atf.entity.property.Property;
import com.lara.atf.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RentSolicitude {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Property property;

    @Column(nullable = false)
    private RentSolicitudeStatus status;

    @JoinColumn(nullable = false)
    @ManyToOne
    private User applicant;

    @Column(nullable = false)
    private Date timestamp;

    @Column(nullable = false)
    private Date arrivalDate;

    @Column(nullable = false)
    private Date departureDate;

    @Column(nullable = false)
    private Integer peopleQuantity;

    //Copy of the price in case the landlord updates it
    @Column(nullable = false)
    private BigDecimal price;
}
