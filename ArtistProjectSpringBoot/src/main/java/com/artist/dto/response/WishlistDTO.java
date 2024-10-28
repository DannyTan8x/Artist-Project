package com.artist.dto.response;

public class WishlistDTO {

	private String paintingId;
	private String paintingName;
	private String artisName;
	private Double price;
	private String smallUrl;
	private byte[] image;

	public WishlistDTO() {
		super();
	}

	public WishlistDTO(String paintingId, String paintingName, String artisName, Double price, String smallUrl,
			byte[] image) {
		super();
		this.paintingId = paintingId;
		this.paintingName = paintingName;
		this.artisName = artisName;
		this.price = price;
		this.smallUrl = smallUrl;
		this.image = image;
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

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getSmallUrl() {
		return smallUrl;
	}

	public void setSmallUrl(String smallUrl) {
		this.smallUrl = smallUrl;
	}

	public String getPaintingId() {
		return paintingId;
	}

	public void setPaintingId(String paintingId) {
		this.paintingId = paintingId;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

}
