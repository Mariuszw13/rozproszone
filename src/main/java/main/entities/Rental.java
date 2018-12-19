package main.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private User client;

    @Column(name = "date_start")
    private Date startDate;

    @Column(name = "date_end")
    private Date endDate;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;
}
