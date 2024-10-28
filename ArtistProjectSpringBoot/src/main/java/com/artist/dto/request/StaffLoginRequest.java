package com.artist.dto.request;

public class StaffLoginRequest {
	private String staffUsername;
	private String password;

	public StaffLoginRequest(String staffUsername, String password) {
		super();
		this.staffUsername = staffUsername;
		this.password = password;
	}

	public StaffLoginRequest() {
		super();
	}

	public String getStaffUsername() {
		return staffUsername;
	}

	public void setStaffUsername(String email) {
		this.staffUsername = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
