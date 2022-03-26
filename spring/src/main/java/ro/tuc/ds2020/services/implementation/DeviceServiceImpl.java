package ro.tuc.ds2020.services.implementation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.entities.Sensor;
import ro.tuc.ds2020.repositories.DeviceRepository;
import ro.tuc.ds2020.repositories.SensorRepository;
import ro.tuc.ds2020.services.DeviceService;

import java.util.*;
import javax.transaction.Transactional;

@Service
public class DeviceServiceImpl implements DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private SensorRepository sensorRepository;


    public DeviceServiceImpl() {

    }


    @Override
    @Transactional
    public Device save(Device dto) {
        return deviceRepository.save(dto);
    }

    @Override
    @Transactional
    public Device delete(UUID id) {
        Device device = deviceRepository.findById(id).get();
        deviceRepository.delete(device);
        return device;
    }

    @Override
    @Transactional
    public Device update(UUID id, Device dto) {
        Device device = deviceRepository.findById(id).get();

        if(dto.getDescription() != null){
            device.setDescription(dto.getDescription());
        }

        if(dto.getAddress() != null){
            device.setAddress(dto.getAddress());
        }

        if(dto.getClient()!= null)
        {
            device.setClient(dto.getClient());
        }

        if(dto.getSensor() != null){
            device.setSensor(dto.getSensor());
        }

        if(dto.getAvarageEnergyConsumption() != null){
            device.setAvarageEnergyConsumption(dto.getAvarageEnergyConsumption());
        }

        if(dto.getMaximumEnergyConsumption() != null){
            device.setMaximumEnergyConsumption(dto.getMaximumEnergyConsumption());
        }
        System.out.println("UPDATE DEVICE");
        System.out.println(device);
        deviceRepository.save(device);
        return device;
    }

    @Override
    @Transactional
    public Device addSensor(UUID idDevice, UUID idSensor) {
        Device device = deviceRepository.findById(idDevice).get();
        Sensor sensor = sensorRepository.findById(idSensor).get();
        sensor.setDeviceId(idDevice);
        System.out.println("le gaseste");
        device.setSensor(sensor);
        System.out.println("il adauga");
        System.out.println(device);
        deviceRepository.save(device);
        sensorRepository.save(sensor);
        System.out.println("il salveaza");
        return device;
    }


    @Override
    @Transactional
    public List<Device> findAll() {
        List<Device> devices = new ArrayList<>();

         deviceRepository.findAll().forEach(device -> devices.add(device));
        System.out.println("ajunge aici");
        System.out.println(devices);
        System.out.println("de asta nu mai trece nici mort");
         return devices;
    }

    @Override
    @Transactional
    public List<Device> findDeviceWithoutClient() {
        List<Device> devices = new ArrayList<>();
        deviceRepository.findAll().forEach(device -> devices.add(device));
        System.out.println("da");
        List<Device> result = new ArrayList<>();
        System.out.println(devices);
        for(Device d:devices){
            try {
                if (d.getClient() == null) {
                    result.add(d);
                }
            }
            catch(Exception e){

            }
        }
        System.out.println(result);
        return result;
    }

    @Override
    @Transactional
    public Device findByDescription(String description) {
        System.out.println("ajunge aici");
        Device device = deviceRepository.findDeviceByDescription(description);
        System.out.println("dada");
        System.out.println(device.toString());
        return device;
    }


    @Override
    @Transactional
    public Device getDeviceById(UUID id) {
        Device device = deviceRepository.findById(id).get();
        //fara asta nu merge????
        System.out.println(device);
        return device;
    }

    @Override
    @Transactional
    public Device detachSensorByDeviceId(UUID idDevice) {
        Device device = deviceRepository.findById(idDevice).get();
        Sensor sensor = device.getSensor();
        sensor.setDeviceId(null);
        device.setSensor(null);
        deviceRepository.save(device);
        sensorRepository.save(sensor);
        return device;
    }
}
