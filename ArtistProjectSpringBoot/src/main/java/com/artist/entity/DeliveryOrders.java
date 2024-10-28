package com.artist.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "deliveryorders")
public class DeliveryOrders {

	@Id
	@Column(name = "delivery_number")
	private String deliveryNumber;
	
	@Column(name = "create_date")
	private LocalDateTime createDate;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "att_name")
	private String attName;
	
	@Column(name = "att_phone")
	private String attPhone;
	
	@Column(name = "delivery_address")
	private String deliveryAddress;
	
	@Column(name = "delivery_instrictions")
	private String deliveryInstrictions;
	
	@Column(name = "delivery_fee")
	private Integer  deliveryFee;
	
	@Column(name = "total_amount")
	private Integer  totalAmount;
	
	@Column(name = "package_staff")
	private String  packageStaff;
	
	@Column(name = "delivery_staff")
	private String  deliveryStaff;
	
	
	@OneToMany(mappedBy = "deliveryOrders", fetch = FetchType.LAZY)
	@JsonBackReference
	private List<Orders> orders;

	public DeliveryOrders() {
		super();
	}


	public DeliveryOrders(String deliveryNumber, LocalDateTime createDate, String status, String attName,
			String attPhone, String deliveryAddress, String deliveryInstrictions, Integer  deliveryFee, Integer  totalAmount,
			String  packageStaff, String  deliveryStaff) {
		super();
		this.deliveryNumber = deliveryNumber;
		this.createDate = createDate;
		this.status = status;
		this.attName = attName;
		this.attPhone = attPhone;
		this.deliveryAddress = deliveryAddress;
		this.deliveryInstrictions = deliveryInstrictions;
		this.deliveryFee = deliveryFee;
		this.totalAmount = totalAmount;
		this.packageStaff = packageStaff;
		this.deliveryStaff = deliveryStaff;
	}


	public DeliveryOrders(String deliveryNumber, LocalDateTime createDate, String status, String attName,
			String attPhone, String deliveryAddress, String deliveryInstrictions, Integer  deliveryFee, Integer  totalAmount,
			String  packageStaff, String  deliveryStaff, List<Orders> orders) {
		super();
		this.deliveryNumber = deliveryNumber;
		this.createDate = createDate;
		this.status = status;
		this.attName = attName;
		this.attPhone = attPhone;
		this.deliveryAddress = deliveryAddress;
		this.deliveryInstrictions = deliveryInstrictions;
		this.deliveryFee = deliveryFee;
		this.totalAmount = totalAmount;
		this.packageStaff = packageStaff;
		this.deliveryStaff = deliveryStaff;
		this.orders = orders;

	}

	


	public List<Orders> getOrders() {
		return orders;
	}


	public void setOrders(List<Orders> orders) {
		this.orders = orders;
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

	public String getAttPhone() {
		return attPhone;
	}

	public void setAttPhone(String attPhone) {
		this.attPhone = attPhone;
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

	public Integer getDeliveryFee() {
		return deliveryFee;
	}

	public void setDeliveryFee(Integer deliveryFee) {
		this.deliveryFee = deliveryFee;
	}

	public Integer getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Integer totalAmount) {
		this.totalAmount = totalAmount;
	}


	public String getPackageStaff() {
		return packageStaff;
	}


	public void setPackageStaff(String packageStaff) {
		this.packageStaff = packageStaff;
	}


	public String getDeliveryStaff() {
		return deliveryStaff;
	}


	public void setDeliveryStaff(String deliveryStaff) {
		this.deliveryStaff = deliveryStaff;
	}


		
}
