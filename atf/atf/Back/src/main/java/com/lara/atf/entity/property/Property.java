package com.lara.atf.entity.property;

import com.lara.atf.entity.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Relations
    @JoinColumn(nullable = false)
    @ManyToOne
    private User user;

    @JoinColumn(nullable = false)
    @OneToOne
    private PropertyImage image;

    //Properties
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    @Enumerated
    private PropertyIngressType ingressType;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    @Min(value = 0)
    private Integer peopleQuantity;

    @Column(nullable = false)
    @Min(value = 0)
    private Integer bathRoomQuantity;

    @Column(nullable = false)
    private Boolean arePetsAllowed;

    @Column(nullable = false)
    private Boolean hasPool;

    @Column(nullable = false)
    private Boolean hasBBQ;

    @Column(nullable = false)
    @Min(value = 0)
    private BigDecimal price;

    //HUA.8
    @Column(nullable = false)
    private Boolean enabled;

}
