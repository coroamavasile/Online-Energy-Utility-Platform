package ro.tuc.ds2020.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientDTO {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String address;
    private Integer anNastere;
    private Integer lunaNastere;
    private Integer ziNastere;
}
