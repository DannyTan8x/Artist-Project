package com.artist.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.*;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "artist")
public class Artist {
	@Id
	@Column(name = "artist_id")
	private String artistId;

	@Column(name = "artist_name")
	private String artistName;

	@Column(name = "desciption", length = 1024)
	private String desciption;

	@Column(name = "url")
	private String url;

	@OneToMany(mappedBy = "artist")
	@JsonManagedReference
	private List<Paintings> paintings;

	public Artist() {
		super();
	}

	public Artist(String artistId, String artistName, String desciption, String url, List<Paintings> paintings) {
		super();
		this.artistId = artistId;
		this.artistName = artistName;
		this.desciption = desciption;
		this.url = url;
		this.paintings = paintings;
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

	public List<Paintings> getPaintings() {
		return paintings;
	}

	public void setPaintings(List<Paintings> paintings) {
		this.paintings = paintings;
	}

}
