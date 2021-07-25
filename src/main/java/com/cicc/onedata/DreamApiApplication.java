package com.cicc.onedata;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableOpenApi
@SpringBootApplication
public class DreamApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(DreamApiApplication.class, args);
    }

}
