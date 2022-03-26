package ro.tuc.ds2020.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import ro.tuc.ds2020.entities.UserDetails;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserDetails, UUID> {

     UserDetails findUserByUsername(String username);
     UserDetails findUserByPassword(String password);
     UserDetails findByUsername(String username);


}
