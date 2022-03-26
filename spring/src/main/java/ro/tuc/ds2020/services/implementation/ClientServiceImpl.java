package ro.tuc.ds2020.services.implementation;

import java.util.*;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.dtos.ClientDTO;
import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.SensorDTO;
import ro.tuc.ds2020.entities.Client;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.entities.Sensor;
import ro.tuc.ds2020.repositories.ClientRepository;
import ro.tuc.ds2020.repositories.DeviceRepository;
import ro.tuc.ds2020.services.ClientService;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
public class ClientServiceImpl implements ClientService {
    private final ClientRepository clientRepository;
    @Autowired
    private DeviceRepository deviceRepository;

    public ClientServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    @Transactional
    public Client save(ClientDTO dto) {
        Client client = new Client();
        client.setPassword(dto.getPassword());
        client.setUsername(dto.getUsername());
        client.setLastName(dto.getLastName());
        client.setFirstName(dto.getFirstName());
        client.setAddress(dto.getAddress());
        client.setBirthDate(new Date(dto.getAnNastere() - 1900,dto.getLunaNastere()-1,dto.getZiNastere() + 1));
        return clientRepository.save(client);
    }

    @Override
    @Transactional
    public Client delete(UUID id) {
        Client client = clientRepository.findById(id).get();
        List<Device> devices = client.getDevices();
        if(client.getDevices().size() == 0)
            clientRepository.delete(client);
        else
        {
            for(Device device:devices)
            {
                device.setClient(null);
            }

            client.setDevices(new ArrayList<>());
            clientRepository.delete(client);
        }
        return client;
    }

    @Override
    @Transactional
    public Client update(UUID id, Client dto) {
        Client client = clientRepository.findById(id).get();

        if(dto.getFirstName()!=null){
            client.setFirstName(dto.getFirstName());
        }

        if(dto.getLastName()!=null){
            client.setLastName(dto.getLastName());
        }

        if(dto.getBirthDate()!=null){
            client.setBirthDate(dto.getBirthDate());
        }

        if(dto.getDevices()!=null){
            client.setDevices(dto.getDevices());
        }

        if(dto.getPassword()!=null){
            client.setPassword(dto.getPassword());
        }

        if(dto.getUsername()!=null)
        {
            client.setUsername(dto.getUsername());
        }

        if(dto.getAddress()!=null)
        {
            client.setAddress(dto.getAddress());
        }

        clientRepository.save(client);
        return client;
    }

    @Override
    @Transactional
    public ClientDTO getClientById(UUID id) {
        ClientDTO clientDTO = new ClientDTO();
        Client client = clientRepository.findById(id).get();
        clientDTO.setAddress(client.getAddress());
        clientDTO.setFirstName(client.getFirstName());
        clientDTO.setLastName(client.getLastName());
        clientDTO.setUsername(client.getUsername());
        return clientDTO;
    }

    @Override
    @Transactional
    public List<Client> findAll() {
        List<Client> clients = new ArrayList<>();
        clientRepository.findAll().forEach(clients::add);
        System.out.println(clients);
        return clients;
    }

    @Override
    @Transactional
    public Client addDevice(UUID idClient,UUID idDevice) {
        Client client = clientRepository.findById(idClient).get();
        Device device = deviceRepository.findById(idDevice).get();
        client.addDevice(device);
        clientRepository.save(client);
        System.out.println("dupa save client");
        device.setClient(client);
        System.out.println("setare client pe device");
        deviceRepository.save(device);
        System.out.println("dupa save device");
        return client;
    }

    @Override
    @Transactional
    public List<DeviceDTO> getDevicesByClientId(UUID idClient) {
        System.out.println(idClient);
        Client client = clientRepository.findById(idClient).get();
        List<Device> clientDevices = client.getDevices();
        HashMap<UUID,DeviceDTO> resultAux = new HashMap();
        List<DeviceDTO> result = new ArrayList<>();
        System.out.println(client.getDevices().size());
        for(Device dev:clientDevices){
//            DeviceDTO devDto = new DeviceDTO();
//            devDto.setId();
            System.out.println(dev.getId());
            if(dev.getSensor() == null) {
                resultAux.put(dev.getId(),new DeviceDTO(dev.getId(), dev.getDescription(), dev.getAddress(),
                        dev.getMaximumEnergyConsumption(), dev.getAvarageEnergyConsumption(), dev.getClient().getId(),
                        null));
            }
            else
            {
                resultAux.put(dev.getId(),new DeviceDTO(dev.getId(), dev.getDescription(), dev.getAddress(),
                        dev.getMaximumEnergyConsumption(), dev.getAvarageEnergyConsumption(), dev.getClient().getId(),
                        dev.getSensor().getId()));
            }
        }

        resultAux.forEach((key,value) -> result.add(value));
        return result;
    }



    @Override
    @Transactional
    public List<SensorDTO> getSensorsByClientId(UUID idClient) {
        List<SensorDTO> result = new ArrayList<>();
        Client client = clientRepository.findById(idClient).get();
        List<Device> devices = client.getDevices();

        for(Device dev: devices){
            Sensor crtSensor = dev.getSensor();
            if(crtSensor != null)
            {
                SensorDTO sensDTO = new SensorDTO(crtSensor.getId(),crtSensor.getDescription(),
                        crtSensor.getMaximumValue(), dev.getId());
                result.add(sensDTO);
            }
        }

        return result;
    }


}
