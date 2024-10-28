package com.artist.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Orders {

	@Id
	@Column(name = "order_number")
	private String orderNumber;

	@Column(name = "order_date")
	private LocalDateTime orderDate;

	@Column(name = "customer_id")
	private String customerId;

	@Column(name = "service_fee")
	private Integer serviceFee;

	@Column(name = "desposit")
	private Integer desposit;

	@Column(name = "total_amount")
	private Integer totalAmount;

	@Column(name = "delivery_number") 
	private String deliveryNumber;

	@OneToOne(mappedBy = "order", fetch = FetchType.LAZY)
	@JsonBackReference
	private OrderDetails orderDetail;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonBackReference
	@JoinColumn(name = "delivery_number", insertable = false, updatable = false)
	private DeliveryOrders deliveryOrders;

	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "customer_id", insertable = false, updatable = false)
	private Customers customer;

	public Orders() {
		super();
	}

	public Orders(LocalDateTime orderDate, String customerId, int serviceFee, int desposit, int totalAmount,
			String deliveryNumber, OrderDetails orderDetail, Customers customer) {
		super();
		this.orderDate = orderDate;
		this.customerId = customerId;
		this.serviceFee = serviceFee;
		this.desposit = desposit;
		this.totalAmount = totalAmount;
		this.deliveryNumber = deliveryNumber;
		this.orderDetail = orderDetail;
		this.customer = customer;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public void setServiceFee(int serviceFee) {
		this.serviceFee = serviceFee;
	}

	public Customers getCustomer() {
		return customer;
	}

	public void setCustomer(Customers customer) {
		this.customer = customer;
	}

	public OrderDetails getOrderDetail() {
		return orderDetail;
	}

	public void setOrderDetail(OrderDetails orderDetail) {
		this.orderDetail = orderDetail;
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

	public DeliveryOrders getDeliveryOrder() {
		return deliveryOrders;
	}

	public void setDeliveryOrder(DeliveryOrders deliveryOrder) {
		this.deliveryOrders = deliveryOrder;
	}

	public String getDeliveryNumber() {
		return deliveryNumber;
	}

	public void setDeliveryNumber(String deliveryNumber) {
		this.deliveryNumber = deliveryNumber;
	}

	public DeliveryOrders getDeliveryOrders() {
		return deliveryOrders;
	}

	public void setDeliveryOrders(DeliveryOrders deliveryOrders) {
		this.deliveryOrders = deliveryOrders;
	}

}
