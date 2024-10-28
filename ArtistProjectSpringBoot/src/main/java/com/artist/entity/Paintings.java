package com.artist.entity;

import java.time.LocalDateTime;
import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "paintings")
public class Paintings {

	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "artist_id", insertable = false, updatable = false)
	private Artist artist;

	@Id
	@Column(name = "painting_id")
	private String paintingId;

	@Column(name = "painting_name")
	private String paintingName;

	@Column(name = "artist_id")
	private String artistId;

	@Column(name = "larg_url")
	private String largUrl;

	@Column(name = "small_url")
	private String smallUrl;

	@Column(name = "price")
	private Double price;

	@Column(name = "`date`")
	private String date;

	@Column(name = "style")
	private String style;

	@Column(name = "`upload_date`")
	private LocalDateTime uploadDate;

	@Column(name = "genre")
	private String genre;

	@Column(name = "delicated")
	private Integer delicated;

	@Column(name = "status")
	private String status;

	@Lob
	@Column(name = "image", columnDefinition = "mediumblob")
	private byte[] image;

	public Paintings() {
	}

	public Paintings(Artist artist, String paintingId, String paintingName, String artistId, String largUrl,
			String smallUrl, Double price, String date, String style, LocalDateTime uploadDate, String genre,
			Integer delicated, String status) {
		super();
		this.artist = artist;
		this.paintingId = paintingId;
		this.paintingName = paintingName;
		this.artistId = artistId;
		this.largUrl = largUrl;
		this.smallUrl = smallUrl;
		this.price = price;
		this.date = date;
		this.style = style;
		this.uploadDate = uploadDate;
		this.genre = genre;
		this.delicated = delicated;
		this.status = status;
	}

	public Paintings(Artist artist, String paintingId, String paintingName, String artistId, String largUrl,
			String smallUrl, Double price, String date, String style, LocalDateTime uploadDate, String genre,
			Integer delicated, String status, byte[] image) {
		super();
		this.artist = artist;
		this.paintingId = paintingId;
		this.paintingName = paintingName;
		this.artistId = artistId;
		this.largUrl = largUrl;
		this.smallUrl = smallUrl;
		this.price = price;
		this.date = date;
		this.style = style;
		this.uploadDate = uploadDate;
		this.genre = genre;
		this.delicated = delicated;
		this.status = status;
		this.image = image;
	}

	public Artist getArtist() {
		return artist;
	}

	public void setArtist(Artist artist) {
		this.artist = artist;
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

	public String getLargUrl() {
		return largUrl;
	}

	public void setLargUrl(String largUrl) {
		this.largUrl = largUrl;
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public LocalDateTime getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(LocalDateTime uploadDate) {
		this.uploadDate = uploadDate;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public Integer getDelicated() {
		return delicated;
	}

	public void setDelicated(Integer delicated) {
		this.delicated = delicated;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	@Override
	public String toString() {
		return "Paintings [artist=" + artist + ", paintingId=" + paintingId + ", paintingName=" + paintingName
				+ ", artistId=" + artistId + ", largUrl=" + largUrl + ", smallUrl=" + smallUrl + ", price=" + price
				+ ", date=" + date + ", style=" + style + ", uploadDate=" + uploadDate + ", genre=" + genre
				+ ", delicated=" + delicated + ", status=" + status + ", image=" + Arrays.toString(image) + "]";
	}

}