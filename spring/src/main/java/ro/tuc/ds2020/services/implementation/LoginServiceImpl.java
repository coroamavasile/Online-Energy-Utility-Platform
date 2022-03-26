package ro.tuc.ds2020.services.implementation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.dtos.CredentialsDTO;
import ro.tuc.ds2020.dtos.LoginSuccesDTO;
import ro.tuc.ds2020.entities.UserDetails;
import ro.tuc.ds2020.exceptions.ApiExceptionResponse;
import ro.tuc.ds2020.repositories.UserRepository;
import ro.tuc.ds2020.services.LoginService;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.Locale;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserRepository userRepository;


    @Override
    @Transactional
    public LoginSuccesDTO login(CredentialsDTO dto) throws ApiExceptionResponse {
        UserDetails user = userRepository.findUserByUsername(dto.getUsername());
        LoginSuccesDTO response = new LoginSuccesDTO();
        String role = user.getClass().getSimpleName().toUpperCase(Locale.ROOT);

        if (user == null) {
            throw ApiExceptionResponse.builder().errors(Collections.singletonList("Bad credentials"))
                    .message("User not found").status(HttpStatus.NOT_FOUND).build();
        }


        if(role.equals("ADMINISTRATOR")){
            response.setId(user.getId());
            response.setRole(role);
        }
        else
        {
            response.setId(user.getId());
            response.setRole("CLIENT");
        }
        System.out.println("dupa if");
        if(dto.getPassword().equals(user.getPassword())){
            return response;
        }
                throw ApiExceptionResponse.builder().errors(Collections.singletonList("Bad credentials"))
                .message("User not found").status(HttpStatus.NOT_FOUND).build();
    }
}
