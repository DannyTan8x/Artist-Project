package com.artist.dto.response;

import java.util.List;

public class WinningRecordResponse {
	private CustomersDTO customer;
	private List<WinningRecords> winningRecords;

	public WinningRecordResponse(CustomersDTO customer, List<WinningRecords> winningRecords) {
		super();
		this.customer = customer;
		this.winningRecords = winningRecords;
	}

	public WinningRecordResponse() {
		super();
	}

	public CustomersDTO getCustomer() {
		return customer;
	}

	public void setCustomer(CustomersDTO customer) {
		this.customer = customer;
	}

	public List<WinningRecords> getWinningRecords() {
		return winningRecords;
	}

	public void setWinningRecords(List<WinningRecords> winningRecords) {
		this.winningRecords = winningRecords;
	}

}
