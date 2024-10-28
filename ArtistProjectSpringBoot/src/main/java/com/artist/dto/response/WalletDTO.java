package com.artist.dto.response;

import java.time.LocalDateTime;

public class WalletDTO {

	private LocalDateTime refundDate;
	private Double refundAmount;

	public WalletDTO() {
		super();
	}

	public WalletDTO(LocalDateTime refundDate, Double refundAmount) {
		super();
		this.refundDate = refundDate;
		this.refundAmount = refundAmount;
	}

	public LocalDateTime getRefundDate() {
		return refundDate;
	}

	public void setRefundDate(LocalDateTime refundDate) {
		this.refundDate = refundDate;
	}

	public Double getRefundAmount() {
		return refundAmount;
	}

	public void setRefundAmount(Double refundAmount) {
		this.refundAmount = refundAmount;
	}

}
