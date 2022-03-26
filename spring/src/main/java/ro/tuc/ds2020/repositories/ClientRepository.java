package ro.tuc.ds2020.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.tuc.ds2020.entities.Client;

import java.util.*;

@Repository
public interface ClientRepository extends JpaRepository<Client, UUID> {
    Client findClientByFirstName(String firstName);
    Client findClientByAddress(String address);
    Client findClientByUsername(String username);
}
