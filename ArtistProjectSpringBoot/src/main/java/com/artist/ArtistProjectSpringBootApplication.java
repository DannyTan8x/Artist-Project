package com.artist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@SpringBootApplication
@ComponentScan(basePackages = "com.artist")
@EnableTransactionManagement
public class ArtistProjectSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArtistProjectSpringBootApplication.class, args);
	}
}
