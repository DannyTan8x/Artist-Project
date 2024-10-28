package com.artist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import com.artist.dto.request.StaffLoginRequest;
import com.artist.dto.response.StaffDTO;
import com.artist.dto.response.StaffLoginResponse;
import com.artist.entity.Staff;
import com.artist.repository.StaffRepository;
import com.artist.service.impl.StaffServiceImpl;

@RestController
@RequestMapping("/StaffController")
public class StaffController {
	
	@Autowired
	StaffServiceImpl ssi;
	
	@Autowired
	StaffRepository sr;
	
	@RequestMapping(value = "/findall", method=RequestMethod.GET)
	public List<Staff> findall(Model model){
		return sr.findAll();
	}
	
	@RequestMapping(value="/{staffId}", method = RequestMethod.GET)
    public Staff findOneById(@PathVariable("staffId")Integer staffId,  Model model){
        return sr.findById(staffId).get();
    }
	
	@PostMapping(value = "/createStaff", consumes = "application/json")
	public ResponseEntity<?> createStaff(@RequestBody StaffDTO staffDTO) {
		try {
			ssi.create(staffDTO);
			return ResponseEntity.status(HttpStatus.CREATED).body("新增成功");
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
	}
	
	@PostMapping(value ="login")
	public ResponseEntity<?> login(@RequestBody StaffLoginRequest request){
		String staffUsername = request.getStaffUsername();
		String password = request.getPassword();
		try {
			String token = ssi.login(staffUsername, password);

			Integer StaffId = ssi.getStaffIdFromToken(token);
			
			Staff staff = ssi.getOneById(StaffId);

			String staffName = staff.getStaffName();
			Integer roleId = staff.getRoleId();
			StaffLoginResponse response = new StaffLoginResponse(token, staffName, roleId);
			return ResponseEntity.ok(response);
		}catch(RuntimeException e) {
			
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
		
	}
	
	@PutMapping(value ="/editStaff", consumes = "application/json")
    public ResponseEntity<?> updateStaff(@RequestBody StaffDTO staffDTO){
		ssi.update(staffDTO);
        return ResponseEntity.status(HttpStatus.OK).body("修改成功");
    }
	
	@DeleteMapping("/{staffId}")
	public ResponseEntity<Void> deleteStaffById(@PathVariable Integer staffId) {
		sr.deleteById(staffId);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
}
