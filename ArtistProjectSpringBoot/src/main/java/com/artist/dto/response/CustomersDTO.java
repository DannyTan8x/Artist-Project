package com.artist.dto.response;

public class CustomersDTO {

	private String customerId;

	private String name;

	private String nickName;
	
	private String phone;

	private String email;
	
	private String address;
	
	private String password;
	
	private String creditCardNo;
	
	private String bankAccount;
	
	private Double bankBalance;
	
	
	public CustomersDTO() {
		super();
	}

	public CustomersDTO(String customerId, String name, String nickName, String phone, String email, String address,
			String password, String creditCardNo) {
		super();
		this.customerId = customerId;
		this.name = name;
		this.nickName = nickName;
		this.phone = phone;
		this.email = email;
		this.address = address;
		this.password = password;
		this.creditCardNo = creditCardNo;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCreditCardNo() {
		return creditCardNo;
	}

	public void setCreditCardNo(String creditCardNo) {
		this.creditCardNo = creditCardNo;
	}

	public String getBankAccount() {
		return bankAccount;
	}

	public void setBankAccount(String bankAccount) {
		this.bankAccount = bankAccount;
	}

	public Double getBankBalance() {
		return bankBalance;
	}

	public void setBankBalance(Double bankBalance) {
		this.bankBalance = bankBalance;
	}


	
}
