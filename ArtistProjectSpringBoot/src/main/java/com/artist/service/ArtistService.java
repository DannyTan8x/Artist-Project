package com.artist.service;

import java.util.List;

import com.artist.dto.response.ArtistDTO;
import com.artist.entity.Artist;

public interface ArtistService {

	public void create(ArtistDTO artistDTO);

	public String getArtistInfo();

	public List<Artist> getAll();

	public Artist getOneById(String artistId);

	void update(ArtistDTO artistDTO);

	void deleteArtist(Artist artist);

	void deleteByArtistId(String artistId);

}
