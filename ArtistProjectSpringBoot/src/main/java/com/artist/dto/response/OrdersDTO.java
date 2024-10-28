package com.artist.dto.response;

import java.time.LocalDateTime;

public class OrdersDTO {

	private String orderNumber;
	private LocalDateTime orderDate;
	private String customerId;
	private Integer serviceFee;
	private Integer desposit;
	private Integer totalAmount;
	private String deliveryNumber;
	private String paintingId;


	public OrdersDTO() {
		super();
	}

	public OrdersDTO(String orderNumber, LocalDateTime orderDate, String customerId, Integer serviceFee,
			Integer desposit, Integer totalAmount, String deliveryNumber, String paintingId) {
		super();
		this.orderNumber = orderNumber;
		this.orderDate = orderDate;
		this.customerId = customerId;
		this.serviceFee = serviceFee;
		this.desposit = desposit;
		this.totalAmount = totalAmount;
		this.deliveryNumber = deliveryNumber;
		this.paintingId = paintingId;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public Integer getServiceFee() {
		return serviceFee;
	}

	public void setServiceFee(Integer serviceFee) {
		this.serviceFee = serviceFee;
	}

	public Integer getDesposit() {
		return desposit;
	}

	public void setDesposit(Integer desposit) {
		this.desposit = desposit;
	}

	public Integer getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Integer totalAmount) {
		this.totalAmount = totalAmount;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}

	public String getDeliveryNumber() {
		return deliveryNumber;
	}

	public void setDeliveryNumber(String deliveryNumber) {
		this.deliveryNumber = deliveryNumber;
	}



	public String getPaintingId() {
		return paintingId;
	}



	public void setPaintingId(String paintingId) {
		this.paintingId = paintingId;
	}
	
	
	
}
	

