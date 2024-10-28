package com.artist.dto.response;

public class ArtistDTO {
	
	private String artistId;
	private String artistName;
	private String desciption;
	private String url;
	private PaintingDTO paintingDTO;
	public ArtistDTO() {
		super();
	}

	
	public ArtistDTO(String artistId, String artistName, String desciption, String url, PaintingDTO paintingDTO) {
		super();
		this.artistId = artistId;
		this.artistName = artistName;
		this.desciption = desciption;
		this.url = url;
		this.paintingDTO = paintingDTO;
	}


	public String getArtistId() {
		return artistId;
	}


	public void setArtistId(String artistId) {
		this.artistId = artistId;
	}


	public String getArtistName() {
		return artistName;
	}


	public void setArtistName(String artistName) {
		this.artistName = artistName;
	}


	public String getDesciption() {
		return desciption;
	}
	public void setDesciption(String desciption) {
		this.desciption = desciption;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public PaintingDTO getPaintingDTO() {
		return paintingDTO;
	}
	public void setPaintingDTO(PaintingDTO paintingDTO) {
		this.paintingDTO = paintingDTO;
	}
	
	
}
