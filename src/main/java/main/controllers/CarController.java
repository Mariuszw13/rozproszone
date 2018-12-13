package main.controllers;

import main.entities.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import main.repository.CarRepository;

@RestController
public class CarController {

    @Autowired
    private CarRepository carRepository;


    @RequestMapping("/")
    public String home() {
        return "Hello Docker World";
    }

    @GetMapping("/car")
    public Iterable<Car> index(){
        return carRepository.findAll();
    }
}
