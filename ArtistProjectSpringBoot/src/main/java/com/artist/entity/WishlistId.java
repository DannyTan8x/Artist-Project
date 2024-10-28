package com.artist.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class WishlistId implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "customer_id")
	private String customerId;

	@Column(name = "painting_id")
	private String paintingId;

	public WishlistId() {
	}

	public WishlistId(String customerId, String paintingId) {
		this.customerId = customerId;
		this.paintingId = paintingId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(customerId, paintingId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		WishlistId other = (WishlistId) obj;
		return Objects.equals(customerId, other.customerId) && Objects.equals(paintingId, other.paintingId);
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getPaintingId() {
		return paintingId;
	}

	public void setPaintingId(String paintingId) {
		this.paintingId = paintingId;
	}
}