package com.artist.config;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.artist.entity.Customers;
import com.artist.service.impl.CustomersServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	@Lazy
	private CustomersServiceImpl csi;

	@Value("${jwt.secret}")
	private String jwtSecret;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {

		Optional<String> jwt = extractJwtFromHeader(request);
		if (jwt.isPresent()) {
			String email = csi.getEmailFromToken(jwt.get());
			if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				Customers customer = csi.getCustomer(email);
				if (customer != null && csi.validateToken(jwt.get(), customer.getEmail())) {
					UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
							customer, null, Collections.emptyList());
					SecurityContextHolder.getContext().setAuthentication(authenticationToken);
				}
			}
		}

		chain.doFilter(request, response);
	}

	private Optional<String> extractJwtFromHeader(HttpServletRequest request) {
		String authorizationHeader = request.getHeader("Authorization");
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			return Optional.of(authorizationHeader.substring(7));
		}
		return Optional.empty();
	}
}
