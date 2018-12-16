package main.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;


@Entity
@Data
@AllArgsConstructor
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id", table = "user")
    private User client;

    @Column(name = "date_from")
    private Date startDate;

    @Column(name = "date_to")
    private Date endDate;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;
}
