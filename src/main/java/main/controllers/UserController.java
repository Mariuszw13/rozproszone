package main.controllers;

import main.entities.User;
import main.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public Iterable<User> index(){
        return userRepository.findAll();
    }

    @GetMapping("/users/{email}")
    public Long getUserIdByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email).getId();
    }
}
