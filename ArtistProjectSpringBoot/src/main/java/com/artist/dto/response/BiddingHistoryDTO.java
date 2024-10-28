package com.artist.dto.response;

import java.time.LocalDateTime;

public class BiddingHistoryDTO {

	private String nickName; 
	private String paintingId;
	private String paintingName;
	private String artisName;
	private String smallUrl;
	private LocalDateTime bidTime;
	private Double bidAmount;
	private String status;

	public BiddingHistoryDTO() {
		super();
	}

	public BiddingHistoryDTO(String nickName, String paintingId, String paintingName, String artisName, String smallUrl,
			LocalDateTime bidTime, Double bidAmount, String status) {
		super();
		this.nickName = nickName;
		this.paintingId = paintingId;
		this.paintingName = paintingName;
		this.artisName = artisName;
		this.smallUrl = smallUrl;
		this.bidTime = bidTime;
		this.bidAmount = bidAmount;
		this.status = status;
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

	public String getPaintingId() {
		return paintingId;
	}

	public void setPaintingId(String paintingId) {
		this.paintingId = paintingId;
	}

	public String getPaintingName() {
		return paintingName;
	}

	public void setPaintingName(String paintingName) {
		this.paintingName = paintingName;
	}

	public String getArtisName() {
		return artisName;
	}

	public void setArtisName(String artisName) {
		this.artisName = artisName;
	}

	public String getSmallUrl() {
		return smallUrl;
	}

	public void setSmallUrl(String smallUrl) {
		this.smallUrl = smallUrl;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
