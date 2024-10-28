package com.artist.dto.response;

import java.util.List;

public class WalletResponse {

	private String bankAccount;
	private String creditCardNo;
	private Double bankBalance;

	private List<WalletDTO> biddingHistory;

	public WalletResponse() {
		super();
	}

	public WalletResponse(String bankAccount, String creditCardNo, Double bankBalance, List<WalletDTO> biddingHistory) {
		super();
		this.bankAccount = bankAccount;
		this.creditCardNo = creditCardNo;
		this.bankBalance = bankBalance;
		this.biddingHistory = biddingHistory;
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

	public Double getBankBalance() {
		return bankBalance;
	}

	public void setBankBalance(Double bankBalance) {
		this.bankBalance = bankBalance;
	}

	public List<WalletDTO> getBiddingHistory() {
		return biddingHistory;
	}

	public void setBiddingHistory(List<WalletDTO> biddingHistory) {
		this.biddingHistory = biddingHistory;
	}

}
