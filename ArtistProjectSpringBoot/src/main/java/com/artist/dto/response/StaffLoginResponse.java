package com.artist.dto.response;

public class StaffLoginResponse {
	private String token;
	private String StaffName;
	private Integer roleId;

	public StaffLoginResponse(String token, String StaffName, Integer roleId) {
		this.token = token;
		this.StaffName = StaffName;
		this.roleId = roleId;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getStaffName() {
		return StaffName;
	}

	public void setStaffName(String staffName) {
		StaffName = staffName;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

}
