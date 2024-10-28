package com.artist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.artist.entity.Artist;

public interface ArtistRepository extends JpaRepository<Artist,String> {
	
}
