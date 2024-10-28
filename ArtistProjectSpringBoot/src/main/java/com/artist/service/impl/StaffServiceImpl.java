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

import com.artist.dto.response.StaffDTO;
import com.artist.entity.Staff;
import com.artist.repository.StaffRepository;
import com.artist.service.StaffService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class StaffServiceImpl implements StaffService {

	@Autowired
	private StaffRepository sr;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Value("${jwt.secret}")
	private String jwtSecret;

	@Override
	public void create(StaffDTO staffDTO) {
		Staff staff = new Staff(staffDTO.getStaffName(), staffDTO.getStaffDepartment(), staffDTO.getStaffUsername(),
				passwordEncoder.encode(staffDTO.getStaffPassword()), staffDTO.getRoleId());
		sr.save(staff);
	}

	@Override
	public List<Staff> getAll() {
		return sr.findAll();
	}

	@Override
	public Staff getOneById(Integer staffId) {
		Optional<Staff> byId = sr.findById(staffId);
		Staff staff = byId.get();
		return staff;
	}

	@Override
	public void update(StaffDTO staffDTO) {
		Optional<Staff> s = sr.findById(staffDTO.getStaffId());
		if (s.isPresent()) {
			Staff staff = s.get();
			staff.setStaffDepartment(staffDTO.getStaffDepartment());
			staff.setStaffName(staffDTO.getStaffName());
			staff.setStaffUsername(staffDTO.getStaffUsername());
			staff.setStaffPassword(passwordEncoder.encode(staffDTO.getStaffPassword()));
			staff.setRoleId(staffDTO.getRoleId());
			sr.save(staff);
		} else {
			System.out.println("data not fond");
		}

	}

	@Override
	public void deleteByStaffId(Integer staffId) {
		sr.deleteById(staffId);
	}

	@Override
	public String login(String staffUsername, String staffPassword) {
//		 TODO Auto-generated method stub
		Staff staff = sr.findByStaffUsername(staffUsername)
				.orElseThrow(() -> new RuntimeException("Staff UserName doesn't exist"));
		if (passwordEncoder.matches(staffPassword, staff.getStaffPassword())) {
			return generateToken(staff);
		} else {
			throw new RuntimeException("Invalid password");
		}
	}

	private String generateToken(Staff staff) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("StaffId", staff.getStaffId());
		claims.put("roleId", staff.getRoleId());
		System.out.println("staffID"+staff.getStaffId());
		return Jwts.builder().setSubject(staff.getStaffUsername()).addClaims(claims)
				.setExpiration(new Date(System.currentTimeMillis() + 86400000))
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();

	}

	public Integer getStaffIdFromToken(String token) {
		if (token.startsWith("Bearer ")) {
			token = token.substring(7);
		}

		Claims claims = Jwts.parser()
				.setSigningKey(jwtSecret)
				.parseClaimsJws(token)
				.getBody();
		System.out.println(claims.get("StaffId"));
		return (Integer) claims.get("StaffId");

	}

}
