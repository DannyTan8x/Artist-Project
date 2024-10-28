package com.artist.dto.response;

public class SimplePaintingDTO {
	private String paintingId;
	private String paintingName;
	private String artistName;
	private byte[] image;

	public SimplePaintingDTO(String paintingId, String paintingName, String artistName, byte[] image) {
		super();
		this.paintingId = paintingId;
		this.paintingName = paintingName;
		this.artistName = artistName;
		this.image = image;
	}
	public SimplePaintingDTO() {
		super();
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
	public String getArtistName() {
		return artistName;
	}
	public void setArtistName(String artistName) {
		this.artistName = artistName;
	}
	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] image) {
		this.image = image;
	}
}
