package ro.tuc.ds2020.controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ro.tuc.ds2020.entities.Administrator;
import ro.tuc.ds2020.services.AdministratorService;

@RestController
@RequestMapping("/administrator")
@CrossOrigin
public class AdministratorController {
    @Autowired
    private AdministratorService administratorService;

    @PostMapping
    public ResponseEntity saveNewAdmin(@RequestBody Administrator dto)
    {

        return ResponseEntity.status(HttpStatus.OK).body(administratorService.save(dto));
    }
}
