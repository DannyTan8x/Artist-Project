package com.artist.dto.response;

public class WinningRecords {
	private String orderNumber;
	private String paintingId;
	private String paintingName;
	private String artistId;
	private String artisName;
	private String smallUrl;
	private Double price;

	public WinningRecords() {
		super();
	}

	public WinningRecords(String paintingId, String paintingName, String artistId, String artisName, String smallUrl,
			Double price, String orderNumber) {
		super();
		this.paintingId = paintingId;
		this.paintingName = paintingName;
		this.artistId = artistId;
		this.artisName = artisName;
		this.smallUrl = smallUrl;
		this.price = price;
		this.orderNumber = orderNumber;
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

	public String getArtistId() {
		return artistId;
	}

	public void setArtistId(String artistId) {
		this.artistId = artistId;
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

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

}
