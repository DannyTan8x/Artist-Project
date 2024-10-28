package com.artist.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.artist.entity.Staff;

public interface StaffRepository extends JpaRepository<Staff, Integer>{
	
	Optional<Staff> findByStaffUsername(String sUsername);
 
}
