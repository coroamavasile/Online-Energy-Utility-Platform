package ro.tuc.ds2020.services.implementation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.entities.Administrator;
import ro.tuc.ds2020.repositories.AdministratorRepository;
import ro.tuc.ds2020.services.AdministratorService;

import javax.transaction.Transactional;

@Service
public class AdministratorServiceImpl implements AdministratorService {

    @Autowired
    private AdministratorRepository administratorRepository;

    @Transactional
    @Override
    public Administrator save(Administrator dto) {
        return administratorRepository.save(dto);
    }
}
