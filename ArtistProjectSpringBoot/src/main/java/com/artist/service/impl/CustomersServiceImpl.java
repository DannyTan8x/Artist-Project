package com.artist.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.artist.dto.response.CustomersDTO;
import com.artist.entity.Customers;
import com.artist.repository.CustomersRepository;
import com.artist.service.CustomersService;
import com.artist.utils.IdGenerator;
import com.artist.utils.JwtUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.SignatureException;

@Service
public class CustomersServiceImpl implements CustomersService {

	@Autowired
	private CustomersRepository cr;

	@Autowired
	private IdGenerator idGenerator;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtUtil jwtUtil;

	@Value("${jwt.secret}")
	private String jwtSecret;

	@Override
	public void create(CustomersDTO customersDTO) {
		Customers customer = new Customers();
		customer.setCustomerId(idGenerator.customersId());
		if (cr.existsByEmail(customersDTO.getEmail())) {
			throw new RuntimeException("email already exists");
		}
		customer.setEmail(customersDTO.getEmail());
		customer.setPassword(passwordEncoder.encode(customersDTO.getPassword()));

		customer.setName(customersDTO.getName());
		customer.setNickName(customersDTO.getNickName());
		customer.setPhone(customersDTO.getPhone());
		customer.setAddress(customersDTO.getAddress());
		customer.setCreditCardNo(customersDTO.getCreditCardNo());
		customer.setBankAccount(customersDTO.getBankAccount());
		customer.setBankBalance(0.0);

		cr.save(customer);
	}

	@Override
	public void update(Customers customer) {
		cr.save(customer);
	}

	public void deitAccountUpdate(String CustomerId, String name, String nickName, String phone, String address) {
		Optional<Customers> optionalCustomers = cr.findByCustomerId(CustomerId);
		if (optionalCustomers.isPresent()) {
			Customers customer = optionalCustomers.get();

			customer.setName(name);
			customer.setNickName(nickName);
			customer.setPhone(phone);
			customer.setAddress(address);
			cr.save(customer);
		} else {
			System.out.println("找不到此 id 的客戶");
		}
	}

	public void editAccountUpdate(CustomersDTO customersDTO) {
		Customers customer = getCustomer(customersDTO.getEmail());
		customer.setName(customersDTO.getName());
		customer.setNickName(customersDTO.getNickName());
		customer.setPhone(customersDTO.getPhone());
		customer.setAddress(customersDTO.getAddress());
		cr.save(customer);
	}

	public void editPassword(CustomersDTO customersDTO) {
		Customers customer = getCustomer(customersDTO.getEmail());
		customer.setPassword(passwordEncoder.encode(customersDTO.getPassword()));

		cr.save(customer);
	}

	public void editPasswordforemail(Customers customer, String password) {
		customer.setPassword(passwordEncoder.encode(password));
		cr.save(customer);
	}

	@Override
	public void delete(Customers customers) {

	}

	@Override
	public void deleteByEmail(String email) {

	}

	public Customers getCustomer(String email) {
		Optional<Customers> optionalCustomers = cr.findByEmail(email);
		if (optionalCustomers.isPresent()) {
			Customers customer = optionalCustomers.get();
			return customer;
		}
		return null;
	}

	@Override
	public String login(String email, String password) {
		Customers customer = cr.findByEmail(email).orElseThrow(() -> new RuntimeException("Email doesn't exist"));
		if (passwordEncoder.matches(password, customer.getPassword())) {
			return generateToken(customer);
		} else {
			throw new RuntimeException("Invalid password");
		}

	}

	public Customers getByCustomerId(String customerId) {
		Optional<Customers> optionalCustomerId = cr.findById(customerId);
		if (optionalCustomerId.isPresent()) {
			Customers customers = optionalCustomerId.get();

			return customers;
		} else {
			return null;
		}
	}

	public CustomersDTO getCustomerDTO(String customerId) {
		Optional<Customers> optionalCustomerId = cr.findById(customerId);
		if (optionalCustomerId.isPresent()) {
			Customers customers = optionalCustomerId.get();
			CustomersDTO customerDTO = new CustomersDTO();
			customerDTO.setName(customers.getName());
			customerDTO.setNickName(customers.getNickName());
			customerDTO.setEmail(customers.getEmail());
			customerDTO.setPhone(customers.getPhone());
			customerDTO.setAddress(customers.getAddress());
			customerDTO.setPassword(customers.getPassword());

			return customerDTO;
		} else {
			return null;
		}
	}

	private String generateToken(Customers customer) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("nickname", customer.getNickName());
		claims.put("customerId", customer.getCustomerId());

		return Jwts.builder().setSubject(customer.getEmail()).addClaims(claims)
				.setExpiration(new Date(System.currentTimeMillis() + 86400000))
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
	}

	public String getCustomerIdFromToken(String token) {
		if (token.startsWith("Bearer ")) {
			token = token.substring(7);
		}

		Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();

		return (String) claims.get("customerId");
	}

	public String getNicknameFromToken(String token) {
		if (token.startsWith("Bearer ")) {
			token = token.substring(7);
		}

		Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();

		return (String) claims.get("nickname");
	}

	public List<String> getRolesFromToken(String token) {
		if (token.startsWith("Bearer ")) {
			token = token.substring(7);
		}
		System.out.println(token);
		Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
		return claims.get("roles", List.class);
	}

	public String getEmailFromToken(String token) {
		if (token.startsWith("Bearer ")) {
			token = token.substring(7);
		}
		Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
		return claims.getSubject();
	}

	public String refreshToken(String token) {
		if (!jwtUtil.isTokenExpired(token)) {
			String email = jwtUtil.extractEmail(token);
			Optional<Customers> byEmail = cr.findByEmail(email);
			if (byEmail.isPresent()) {
				Customers customers = byEmail.get();
				return generateToken(customers);
			}
		}
		throw new RuntimeException("Token has expired");
	}

	public boolean validateToken(String token, String email) {
		try {
			Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
			Date expiration = claims.getExpiration();
			return (expiration != null && !expiration.before(new Date()) && claims.getSubject().equals(email));
		} catch (SignatureException e) {
			return false;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public void editCreditCard(String customerId, String bankAccount, String creditCardNo) {
		Customers customer = getByCustomerId(customerId);
		customer.setBankAccount(bankAccount);
		customer.setCreditCardNo(creditCardNo);
		cr.save(customer);

	}

}
