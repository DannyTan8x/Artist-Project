package com.artist.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "customers")
public class Customers {

	@Id
	@Column(name = "customer_id")
	private String customerId;

	@Column(name = "`name`")
	private String name;

	@Column(name = "nick_name")
	private String nickName;
	
	@Column(name = "phone")
	private String phone;

	@Column(name = "email")
	private String email;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "credit_card_no")
	private String creditCardNo;
	
	@Column(name = "bank_account")
	private String bankAccount;
	
	@Column(name = "bank_balance")
	private Double bankBalance;
	
    @OneToMany(mappedBy = "customer")
    @JsonManagedReference
    private List<Orders> orders;
    
    @OneToMany(mappedBy = "customer")
    private List<Wishlist> wish;


	public Customers() {
		super();
	}

	public Customers(String customerId, String name, String nickName, String phone, String email, String address,
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
	
	


	public Customers(String customerId, String name, String nickName, String phone, String email, String address,
			String password, String creditCardNo, String bankAccount, Double bankBalance, List<Orders> orders,
			List<Wishlist> wish) {
		super();
		this.customerId = customerId;
		this.name = name;
		this.nickName = nickName;
		this.phone = phone;
		this.email = email;
		this.address = address;
		this.password = password;
		this.creditCardNo = creditCardNo;
		this.bankAccount = bankAccount;
		this.bankBalance = bankBalance;
		this.orders = orders;
		this.wish = wish;
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



	public List<Orders> getOrders() {
		return orders;
	}

	public void setOrders(List<Orders> orders) {
		this.orders = orders;
	}

	public List<Wishlist> getWish() {
		return wish;
	}

	public void setWish(List<Wishlist> wish) {
		this.wish = wish;
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
