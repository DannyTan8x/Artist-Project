package com.artist.service;

import java.util.List;

import com.artist.dto.response.StaffDTO;
import com.artist.entity.Staff;

public interface StaffService {

	public void create(StaffDTO staffDTO);

	public List<?> getAll();

	public Staff getOneById(Integer staffId);

	String login(String staffUsername, String staffPassword);

	public void update(StaffDTO staffDTO);

	public void deleteByStaffId(Integer staffId);

}
