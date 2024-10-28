package com.artist.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.artist.dto.response.ArtistDTO;
import com.artist.entity.Artist;
import com.artist.repository.ArtistRepository;
import com.artist.service.ArtistService;
import com.artist.utils.IdGenerator;

@Service
public class ArtistServiceImpl implements ArtistService {
	@Autowired
	private ArtistRepository ar;

	@Autowired
	private IdGenerator idGenerator;

	@Override
	public void create(ArtistDTO artistDTO) {
		Artist art = new Artist();
		art.setArtistId(idGenerator.artistId());
		art.setArtistName(artistDTO.getArtistName());
		art.setDesciption(artistDTO.getDesciption());
		art.setUrl(artistDTO.getUrl());
		art.setPaintings(null);
		ar.save(art);
	}

	@Override
	public String getArtistInfo() {

		return null;
	}

	@Override
	public List<Artist> getAll() {
		return ar.findAll();
	}

	@Override
	public void update(ArtistDTO artistDTO) {
		Optional<Artist> optionalArtistId = ar.findById(artistDTO.getArtistId());
		if (optionalArtistId.isPresent()) {
			Artist art = optionalArtistId.get();
			art.setArtistName(artistDTO.getArtistName());
			art.setDesciption(artistDTO.getDesciption());
			art.setUrl(artistDTO.getUrl());

			ar.save(art);
		} else {
			System.out.println("Artist is not find");
		}
	}

	@Override
	public void deleteArtist(Artist artist) {
		ar.delete(artist);
	}

	@Override
	public void deleteByArtistId(String artistId) {
		ar.deleteById(artistId);
	}

	@Override
	public Artist getOneById(String artistId) {
		Optional<Artist> optionalArtistId = ar.findById(artistId);
		if (optionalArtistId.isPresent()) {
			Artist artist = optionalArtistId.get();
			return artist;
		} else {
			return null;
		}
	}

}
