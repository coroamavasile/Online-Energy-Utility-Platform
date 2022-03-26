package ro.tuc.ds2020.dtos;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CredentialsDTO {
    private String username;
    private String password;
}
