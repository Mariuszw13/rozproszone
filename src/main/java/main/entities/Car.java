package main.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "MAKE", nullable = false, length = 45)
    private String make;

    @Column(name = "MODEL", nullable = false, length = 45)
    private String model;

    @Column(name = "RENT_COST", nullable = false, precision = 10, scale = 10)
    private Float rentCost;

    @Column(name = "RENT_FLAG", nullable = false, precision = 1)
    private Boolean rentFlag;
}
