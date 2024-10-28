package com.artist.dto.response;

public class StaffDTO {

	private int staffId;
	private String staffName;
	private String staffDepartment;
	private String staffUsername;
	private String staffPassword;
	private Integer roleId;

	public StaffDTO() {
		super();
	}

	public StaffDTO(String staffName, String staffDepartment, String staffUsername, String staffPassword,
			Integer roleId) {
		super();
		this.staffName = staffName;
		this.staffDepartment = staffDepartment;
		this.staffUsername = staffUsername;
		this.staffPassword = staffPassword;
		this.roleId = roleId;
	}

	public int getStaffId() {
		return staffId;
	}

	public void setStaffId(int staffId) {
		this.staffId = staffId;
	}

	public String getStaffName() {
		return staffName;
	}

	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}

	public String getStaffDepartment() {
		return staffDepartment;
	}

	public void setStaffDepartment(String staffDepartment) {
		this.staffDepartment = staffDepartment;
	}

	public String getStaffUsername() {
		return staffUsername;
	}

	public void setStaffUsername(String staffUsername) {
		this.staffUsername = staffUsername;
	}

	public String getStaffPassword() {
		return staffPassword;
	}

	public void setStaffPassword(String staffPassword) {
		this.staffPassword = staffPassword;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

}
