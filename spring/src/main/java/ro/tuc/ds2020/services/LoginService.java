package ro.tuc.ds2020.services;

import org.springframework.stereotype.Component;
import ro.tuc.ds2020.dtos.CredentialsDTO;
import ro.tuc.ds2020.dtos.LoginSuccesDTO;
import ro.tuc.ds2020.exceptions.ApiExceptionResponse;

@Component
public interface LoginService {
    LoginSuccesDTO login(CredentialsDTO dto) throws ApiExceptionResponse;
}
