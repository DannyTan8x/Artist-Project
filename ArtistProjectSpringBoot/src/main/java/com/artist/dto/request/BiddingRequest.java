package com.artist.dto.request;

import java.time.LocalDateTime;

public class BiddingRequest {
	
	
	private String paintingId;
	
	private String bidderId;
	
	private LocalDateTime bidTime;
	
	private Double bidAmount;

	public BiddingRequest() {
		super();
	}

	public BiddingRequest(String paintingId, Double bidAmount) {
		super();
		this.paintingId = paintingId;
		this.bidAmount = bidAmount;
	}

	public String getPaintingId() {
		return paintingId;
	}

	public void setPaintingId(String paintingId) {
		this.paintingId = paintingId;
	}

	public String getBidderId() {
		return bidderId;
	}

	public void setBidderId(String bidderId) {
		this.bidderId = bidderId;
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
