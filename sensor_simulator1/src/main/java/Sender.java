import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import java.sql.Timestamp;
import java.util.*;
import java.util.Date;
import java.util.Scanner;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class Sender {
    public static void main(String[] args) throws Exception {
        Long TIME_VALUE = 1l; // durata in secunde
        String uri = "URL_TO_AMQP";
        ConnectionFactory factory = new ConnectionFactory();
        factory.setUri(uri);

        //Recommended settings
        factory.setConnectionTimeout(30000);

        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        String queue = "Sensor_Queue";     //queue name
        boolean durable = false;    //durable - RabbitMQ will never lose the queue if a crash occurs
        boolean exclusive = false;  //exclusive - if queue only will be used by one connection
        boolean autoDelete = false; //autodelete - queue is deleted when last consumer unsubscribes

        channel.queueDeclare(queue, durable, exclusive, autoDelete, null);

        String pathToCsv = "D:\\University\\SD\\sensor-app\\ds2021_30644_coroama_vasile_sensorsimulator\\src\\main\\java\\sensor.csv";
        BufferedReader reader = new BufferedReader(new FileReader(pathToCsv));
        ArrayList<String> valueFromFile = new ArrayList<String>();
        String line = null;
        while ((line = reader.readLine()) != null) {
            valueFromFile.add(line);
        }



        ArrayList<Double> sensorsValue = new ArrayList<>();
        for(String crt:valueFromFile){
            sensorsValue.add(Double.parseDouble(crt));
        }

        int contor = 0;
        String uuidString = "c94e4969-7539-4b4f-8a7e-61af6ce78cad";
        UUID sensorId = UUID.fromString(uuidString);
//        String pathToConfigurationFile = "E:\\Facultate\\An4-Vasi\\SD\\Proiect_DS_Assignment_2\\SendDataProj\\src" +
//                "\\main\\java\\configurationFile.txt";

        String pathToConfigurationFile = "C:\\Users\\Vasi\\Downloads\\configurationFile.txt";
        File myObj = new File(pathToConfigurationFile);
        Scanner myReader = new Scanner(myObj);
        List<UUID> ids = new ArrayList<>();
        while (myReader.hasNextLine()) {
            String data = myReader.nextLine();
            ids.add(UUID.fromString(data));
        }
        System.out.println(ids);
        myReader.close();

        for (Double value : sensorsValue) {
                Timestamp timestamp = new Timestamp(System.currentTimeMillis());
                Date date = new Date(timestamp.getTime());
                Long ts = timestamp.getTime();

                for(UUID id1: ids){
                    SensorDTO sensorDTO = new SensorDTO(ts, id1, value);
                    System.out.println(sensorDTO.toString());

                    //sender
                    ObjectMapper objectMapper = new ObjectMapper();
                    String currentMeasurementJSON = objectMapper.writeValueAsString(sensorDTO);
                    TimeUnit.SECONDS.sleep(1L);
                    channel.basicPublish("", "Sensor_Queue", null, currentMeasurementJSON.getBytes());
                    System.out.println(" [x] Sent '" + currentMeasurementJSON + "'");

                }
//                SensorDTO sensorDTO = new SensorDTO(ts, sensorId, value);
//                System.out.println(sensorDTO.toString());
//
//                //sender
//                ObjectMapper objectMapper = new ObjectMapper();
//                String currentMeasurementJSON = objectMapper.writeValueAsString(sensorDTO);
//                channel.basicPublish("", "Sensor_Queue", null, currentMeasurementJSON.getBytes());
//                System.out.println(" [x] Sent '" + currentMeasurementJSON + "'");


                TimeUnit.SECONDS.sleep(TIME_VALUE);
            }


    }
}


//receiver
//                DeliverCallback deliverCallback = (consumerTag, delivery) -> {
//
//                    String message = new String(delivery.getBody());
//
//                    ObjectMapper objectMapper1 = new ObjectMapper();
//                    JsonNode currentMeasurementJSON1 = objectMapper.readTree(message);
//                    System.out.println("messaged received: " + currentMeasurementJSON1);
//                };
//                channel.basicConsume(queue, true, deliverCallback, consumerTag -> { });