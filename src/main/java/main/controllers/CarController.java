package main.controllers;

import main.entities.Car;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping("/car")
    public void addCar(@RequestBody Car newCar) {
        carRepository.save(newCar);
    }
}
