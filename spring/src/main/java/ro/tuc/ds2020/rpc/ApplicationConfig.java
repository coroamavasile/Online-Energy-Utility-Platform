package ro.tuc.ds2020.rpc;

import com.googlecode.jsonrpc4j.spring.AutoJsonRpcServiceImplExporter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {

    @Bean
    public static AutoJsonRpcServiceImplExporter autoJsonRpcServiceImplExporter(){
//        AutoJsonRpcServiceImplExporter exp = new AutoJsonRpcServiceImplExporter();
        System.out.println("AutoJsonRpc");

        return new AutoJsonRpcServiceImplExporter();

    }
}
