package com.artist.dto.response;

import java.time.LocalDateTime;

public class BidrecordDTO {
	private String nickName; 
	private LocalDateTime bidTime;
	private Double bidAmount;

	public BidrecordDTO() {
		super();
	}

	public BidrecordDTO(String nickName, LocalDateTime bidTime, Double bidAmount) {
		super();
		this.nickName = nickName;
		this.bidTime = bidTime;
		this.bidAmount = bidAmount;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public LocalDateTime getBidTime() {
		return bidTime;
	}

	public void setBidTime(LocalDateTime bidTime) {
		this.bidTime = bidTime;
	}

	public Double getBidAmount() {
		return bidAmount;
	}

	public void setBidAmount(Double bidAmount) {
		this.bidAmount = bidAmount;
	}

	
}
