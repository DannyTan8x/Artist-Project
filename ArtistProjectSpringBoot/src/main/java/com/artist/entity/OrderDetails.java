package com.artist.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "orderdetails")
public class OrderDetails {

	@Id
	@Column(name = "order_number")
	private String orderNumber;

	@Column(name = "painting_id")
	private String paintingId;

	@Column(name = "price")
	private Double price;

	@OneToOne
	@JoinColumn(name = "order_number", referencedColumnName = "orderNumber")
	private Orders order;

	@ManyToOne
	@JoinColumn(name = "painting_id", insertable = false, updatable = false)
	private Paintings painting;

	public OrderDetails() {
	}

	public OrderDetails(String orderNumber, String paintingId, Double price) {
		this.orderNumber = orderNumber;
		this.paintingId = paintingId;
		this.price = price;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	public String getPaintingId() {
		return paintingId;
	}

	public void setPaintingId(String paintingId) {
		this.paintingId = paintingId;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Orders getOrder() {
		return order;
	}

	public void setOrder(Orders order) {
		this.order = order;
	}

	public Paintings getPainting() {
		return painting;
	}

	public void setPainting(Paintings painting) {
		this.painting = painting;
	}

}
