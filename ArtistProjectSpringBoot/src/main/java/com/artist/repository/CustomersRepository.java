package com.artist.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.artist.entity.Customers;

public interface CustomersRepository extends JpaRepository<Customers, String> {

	Optional<Customers> findByEmail(String email);
	
	Optional<Customers> findByCustomerId(String customerId);

	boolean existsByEmail(String email);

	

}
