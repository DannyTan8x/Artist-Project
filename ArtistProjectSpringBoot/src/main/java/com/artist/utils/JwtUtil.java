package com.artist.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;

//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.function.Function;

//import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.artist.entity.Customers;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String jwtSecret;

	public String extractEmail(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	private Claims extractAllClaims(String token) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
	}

	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	public String generateToken(Customers customer) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("nickname", customer.getNickName());
		claims.put("customerId", customer.getCustomerId());

		return Jwts.builder().setSubject(customer.getEmail()).addClaims(claims)
				.setExpiration(new Date(System.currentTimeMillis() + 86400000))
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
	}

	public Boolean validateToken(String token, Customers customer) {
		final String email = extractEmail(token);
		return (email.equals(customer.getEmail()) && !isTokenExpired(token));
	}

	public boolean isTokenExpired(String token) {
		try {
			Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
			Date expirationDate = claims.getExpiration();
			return expirationDate.before(new Date());
		} catch (Exception e) {
			return true;
		}

	}

	public String generatePasswordResetToken(String email) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("email", email);
		return Jwts.builder().setSubject(email).addClaims(claims).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 900000))
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
	}

	public String getCustomerIdFromToken(String token) {
		if (token.startsWith("Bearer ")) {
			token = token.substring(7);
		}

		Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();

		return (String) claims.get("customerId");
	}
}