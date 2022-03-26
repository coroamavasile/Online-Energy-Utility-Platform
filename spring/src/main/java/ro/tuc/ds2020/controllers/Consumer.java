package ro.tuc.ds2020.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Error;
import com.thetransactioncompany.jsonrpc2.JSONRPC2ParseException;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Request;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.dtos.RecordDTO;
import ro.tuc.ds2020.services.SensorService;

import java.util.UUID;

@Service
public class Consumer {

    @Autowired
    private SensorService sensorService;

    @Bean
    private void receive() throws Exception{
        System.out.println("RECEIVER");
        String uri = "amqps://iovzldyr:svuymVUONNm3kExwkHiGEmVV7-g5hQwc@rat.rmq2.cloudamqp.com/iovzldyr";
        ConnectionFactory factory = new ConnectionFactory();
        factory.setUri(uri);
        factory.setConnectionTimeout(30000);
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        String queue = "Sensor_Queue";
        boolean durable = false;
        boolean exclusive = false;
        boolean autoDelete = false;

        channel.queueDeclare(queue, durable, exclusive, autoDelete, null);
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {

            String message = new String(delivery.getBody());

            ObjectMapper objectMapper1 = new ObjectMapper();
            JsonNode currentMeasurementJSON1 = objectMapper1.readTree(message);
            System.out.println("messaged received: " + currentMeasurementJSON1);

            JsonNode measurementValueNode = currentMeasurementJSON1.get("measurementValue");
            String measurementValueString = measurementValueNode.asText();
            System.out.println(measurementValueString);
            Double measurementValue = Double.parseDouble(measurementValueString);
            System.out.println(measurementValue);

            JsonNode timestampNode = currentMeasurementJSON1.get("timestamp");
            String timestampString = timestampNode.asText();
            Long timestamp = Long.parseLong(timestampString);
            System.out.println(timestamp);

            JsonNode sensorIdNode = currentMeasurementJSON1.get("sensorId");
            String sensorIdString = sensorIdNode.asText();
            UUID sensorId = UUID.fromString(sensorIdString);
            System.out.println(sensorId);

            RecordDTO recordDTO = new RecordDTO(timestamp,measurementValue);

            try {
                sensorService.addRecordBySensorId(sensorId, recordDTO);
            } catch (Exception e) {
                e.printStackTrace();
            }

        };
        channel.basicConsume(queue, true, deliverCallback, consumerTag -> { });
    }

}
