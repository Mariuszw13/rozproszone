package main.controllers;

import main.entities.Rental;
import main.repository.RentalRepository;
import org.springframework.web.bind.annotation.*;

@RestController
public class RentalController {

    private final RentalRepository rentalRepository;

    public RentalController(RentalRepository repository) {
        this.rentalRepository = repository;
    }

    @GetMapping("/rentals")
    public Iterable<Rental> getAllRentals() { return rentalRepository.findAll(); }

    @GetMapping("/rentals/client/{email}")
    public Iterable<Rental> getRentalsByClientEmail(@PathVariable String email) {
        return rentalRepository.findAllByClientEmail(email);
    }

    @PostMapping("/rentals")
    Rental newRental(@RequestBody Rental newRental) {
        return rentalRepository.save(newRental);
    }

    @DeleteMapping("/rentals/{id}")
    void deleteRental(@PathVariable Long id) {
        rentalRepository.deleteById(id);
    }

}
