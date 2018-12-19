package main.controllers;

import main.entities.Car;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import main.repository.CarRepository;

@RestController
public class CarController {

    private final CarRepository carRepository;

    public CarController(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @RequestMapping("/")
    public String home() {
        return "Hello Docker World";
    }

    @GetMapping("/car")
    public Iterable<Car> index(){
        return carRepository.findAll();
    }
}
