package com.artist.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public class MyOrderResponse {

	private String customerId;
	private String deliveryNumber;
	private LocalDateTime createDate;
	private String status;
	private String attName;
	private String deliveryAddress;
	private String deliveryInstrictions;
	private Integer totalAmount;
	private List<SimplePaintingDTO> paintings;

	public MyOrderResponse() {
		super();
	}

	public MyOrderResponse(String customerId, String deliveryNumber, LocalDateTime createDate, String status,
			String attName, String deliveryAddress, String deliveryInstrictions, Integer totalAmount,
			List<SimplePaintingDTO> paintings) {
		super();
		this.customerId = customerId;
		this.deliveryNumber = deliveryNumber;
		this.createDate = createDate;
		this.status = status;
		this.attName = attName;
		this.deliveryAddress = deliveryAddress;
		this.deliveryInstrictions = deliveryInstrictions;
		this.totalAmount = totalAmount;
		this.paintings = paintings;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getDeliveryNumber() {
		return deliveryNumber;
	}

	public void setDeliveryNumber(String deliveryNumber) {
		this.deliveryNumber = deliveryNumber;
	}

	public LocalDateTime getCreateDate() {
		return createDate;
	}

	public void setCreateDate(LocalDateTime createDate) {
		this.createDate = createDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAttName() {
		return attName;
	}

	public void setAttName(String attName) {
		this.attName = attName;
	}

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	public String getDeliveryInstrictions() {
		return deliveryInstrictions;
	}

	public void setDeliveryInstrictions(String deliveryInstrictions) {
		this.deliveryInstrictions = deliveryInstrictions;
	}

	public Integer getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Integer totalAmount) {
		this.totalAmount = totalAmount;
	}

	public List<SimplePaintingDTO> getPaintings() {
		return paintings;
	}

	public void setPaintings(List<SimplePaintingDTO> paintings) {
		this.paintings = paintings;
	}

}
