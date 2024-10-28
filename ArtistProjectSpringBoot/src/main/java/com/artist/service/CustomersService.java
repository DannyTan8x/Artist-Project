package com.artist.service;

import com.artist.dto.response.CustomersDTO;
import com.artist.entity.Customers;

public interface CustomersService {

	void create(CustomersDTO customersDTO);

	String login(String email, String password);

	Customers getCustomer(String email);

	Customers getByCustomerId(String customerId);

	CustomersDTO getCustomerDTO(String customerId);

	String getCustomerIdFromToken(String token);

	String refreshToken(String token);

	void update(Customers customer);

	void editAccountUpdate(CustomersDTO customersDTO);

	void editPassword(CustomersDTO customersDTO);

	void editPasswordforemail(Customers customer, String password);

	void editCreditCard(String customerId, String bankAccount, String creditCardNo);

	void delete(Customers customers);

	void deleteByEmail(String email);

}
