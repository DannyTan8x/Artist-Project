package com.artist.dto.response;

import java.time.LocalDateTime;

public class FinalBiddingList {
	private String paintingId ;
	private String paintingName ;
	private String bidderId;
	private LocalDateTime bidLastTime;
	private LocalDateTime auctionClosedTime;
	private Double bidAmount;
	private Double currentHighestBidAmount;
	private String name;
	private String email;

	
	public FinalBiddingList() {
		super();
	}





	public FinalBiddingList(String paintingId, String paintingName, String bidderId, LocalDateTime bidLastTime,
			LocalDateTime auctionClosedTime, Double bidAmount, Double currentHighestBidAmount, String name,
			String email) {
		super();
		this.paintingId = paintingId;
		this.paintingName = paintingName;
		this.bidderId = bidderId;
		this.bidLastTime = bidLastTime;
		this.auctionClosedTime = auctionClosedTime;
		this.bidAmount = bidAmount;
		this.currentHighestBidAmount = currentHighestBidAmount;
		this.name = name;
		this.email = email;
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
	public LocalDateTime getBidLastTime() {
		return bidLastTime;
	}
	public void setBidLastTime(LocalDateTime bidLastTime) {
		this.bidLastTime = bidLastTime;
	}
	public Double getBidAmount() {
		return bidAmount;
	}
	public void setBidAmount(Double bidAmount) {
		this.bidAmount = bidAmount;
	}
	public Double getCurrentHighestBidAmount() {
		return currentHighestBidAmount;
	}
	public void setCurrentHighestBidAmount(Double currentHighestBidAmount) {
		this.currentHighestBidAmount = currentHighestBidAmount;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}
	
	

	public LocalDateTime getAuctionClosedTime() {
		return auctionClosedTime;
	}


	public void setAuctionClosedTime(LocalDateTime auctionClosedTime) {
		this.auctionClosedTime = auctionClosedTime;
	}

	
	public String getPaintingName() {
		return paintingName;
	}





	public void setPaintingName(String paintingName) {
		this.paintingName = paintingName;
	}





	@Override
	public String toString() {
		return "FinalBiddingList [paintingId=" + paintingId + ", paintingName=" + paintingName + ", bidderId="
				+ bidderId + ", bidLastTime=" + bidLastTime + ", auctionClosedTime=" + auctionClosedTime
				+ ", bidAmount=" + bidAmount + ", currentHighestBidAmount=" + currentHighestBidAmount + ", name=" + name
				+ ", email=" + email + "]";
	}




	
}
