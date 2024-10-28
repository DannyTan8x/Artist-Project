package com.artist.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bidrecord")
public class Bidrecord {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bidId;

	@Column(name = "painting_id")
	private String paintingId;

	@Column(name = "bidder_id")
	private String bidderId;

	@Column(name = "status")
	private String status;

	@Column(name = "bid_time")
	private LocalDateTime bidTime;

	@Column(name = "bid_amount")
	private Double bidAmount;

	@Column(name = "is_winning_bid")
	private Boolean isWinningBid;

	@Column(name = "deposit")
	private Double deposit;

	@Column(name = "deposit_status")
	private String depositStatus;

	@Column(name = "refund_date")
	private LocalDateTime refundDate;

	@Column(name = "refund_amount")
	private Double refundAmount;

	public Bidrecord() {
		super();
	}

	public Bidrecord(String paintingId, String bidderId, String status, LocalDateTime bidTime, Double bidAmount,
			Boolean isWinningBid, Double deposit, String depositStatus, Double refundAmount) {
		super();
		this.paintingId = paintingId;
		this.bidderId = bidderId;
		this.status = status;
		this.bidTime = bidTime;
		this.bidAmount = bidAmount;
		this.isWinningBid = isWinningBid;
		this.deposit = deposit;
		this.depositStatus = depositStatus;
		this.refundAmount = refundAmount;
	}

	public Long getBidId() {
		return bidId;
	}

	public void setBidId(Long bidId) {
		this.bidId = bidId;
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

	public Double getBidAmount() {
		return bidAmount;
	}

	public void setBidAmount(Double bidAmount) {
		this.bidAmount = bidAmount;
	}

	public LocalDateTime getBidTime() {
		return bidTime;
	}

	public void setBidTime(LocalDateTime bidTime) {
		this.bidTime = bidTime;
	}

	public Boolean getIsWinningBid() {
		return isWinningBid;
	}

	public void setIsWinningBid(Boolean isWinningBid) {
		this.isWinningBid = isWinningBid;
	}

	public Double getDeposit() {
		return deposit;
	}

	public void setDeposit(Double deposit) {
		this.deposit = deposit;
	}

	public String getDepositStatus() {
		return depositStatus;
	}

	public void setDepositStatus(String depositStatus) {
		this.depositStatus = depositStatus;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
