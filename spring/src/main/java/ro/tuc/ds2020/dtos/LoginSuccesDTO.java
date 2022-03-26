package ro.tuc.ds2020.dtos;

import lombok.*;

import java.util.UUID;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginSuccesDTO {
    private String role;
    private UUID id;

}
