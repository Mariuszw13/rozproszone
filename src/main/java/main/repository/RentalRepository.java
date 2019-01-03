package main.repository;

import main.entities.Rental;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentalRepository extends CrudRepository<Rental, Long> {

    List<Rental> findAllByClientEmail(String email);
}
