package com.artist.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "wishlist")
public class Wishlist {

	@EmbeddedId
	private WishlistId id;

	@ManyToOne
	@JoinColumn(name = "customer_id", referencedColumnName = "customer_id", insertable = false, updatable = false)
	private Customers customer;

	public Wishlist() {
		super();
	}

	public Wishlist(String customerId, String paintingId) {
		super();
		this.id = new WishlistId(customerId, paintingId);
	}

	public WishlistId getId() {
		return id;
	}

	public void setId(WishlistId id) {
		this.id = id;
	}

	public Customers getCustomer() {
		return customer;
	}

	public void setCustomer(Customers customer) {
		this.customer = customer;
	}

	@Override
	public String toString() {
		return "Wishlist [customerId=" + id.getCustomerId() + ", paintingId=" + id.getPaintingId() + "]";
	}
}
