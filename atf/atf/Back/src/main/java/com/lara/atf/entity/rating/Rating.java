package com.lara.atf.entity.rating;

import com.lara.atf.entity.property.Property;
import com.lara.atf.entity.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(nullable = false)
    @ManyToOne
    private Property property;

    @Column(nullable = false)
    private String comment;

    @Column(nullable = false)
    @Min(value = 0)
    @Max(value = 4)
    private Double propertyRating;

    @Column(nullable = false)
    @Min(value = 0)
    @Max(value = 5)
    private Double landlordRating;
}
