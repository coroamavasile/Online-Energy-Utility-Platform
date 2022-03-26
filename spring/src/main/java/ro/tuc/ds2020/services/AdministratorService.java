package ro.tuc.ds2020.services;


import org.springframework.stereotype.Component;
import ro.tuc.ds2020.entities.Administrator;

@Component
public interface AdministratorService {
    Administrator save(Administrator dto);
}
