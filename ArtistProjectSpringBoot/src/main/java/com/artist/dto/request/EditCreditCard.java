package com.artist.dto.request;

public class EditCreditCard {
	private String bankAccount;
	private String creditCardNo;
	public EditCreditCard(String bankAccount, String creditCardNo) {
		super();
		this.bankAccount = bankAccount;
		this.creditCardNo = creditCardNo;
	}
	public EditCreditCard() {
		super();
	}
	public String getBankAccount() {
		return bankAccount;
	}
	public void setBankAccount(String bankAccount) {
		this.bankAccount = bankAccount;
	}
	public String getCreditCardNo() {
		return creditCardNo;
	}
	public void setCreditCardNo(String creditCardNo) {
		this.creditCardNo = creditCardNo;
	}
	

}
