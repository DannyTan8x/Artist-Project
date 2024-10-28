package com.artist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.artist.dto.response.ArtistDTO;
import com.artist.entity.Artist;
import com.artist.service.impl.ArtistServiceImpl;
import com.artist.service.impl.PaintingsServiceImpl;

@RestController
@RequestMapping("/ArtController")
public class ArtistController {
	
	@Autowired
	ArtistServiceImpl asi;
	
	@Autowired
	PaintingsServiceImpl psi;
	
	@GetMapping(value = "/findall")
	public ResponseEntity<?> findall(){
		List<Artist> alllist = asi.getAll();
		return ResponseEntity.ok(alllist);
		
	}
	
	@GetMapping(value = "/{artistId}")
	public ResponseEntity<Artist> findOneById(@PathVariable String artistId){
		Artist art = asi.getOneById(artistId);
		return ResponseEntity.ok(art);
	}
	
	@PostMapping(value = "/createArtist", consumes = "application/json")
	public ResponseEntity<?> createArtist(@RequestBody ArtistDTO artistDTO) {
		try {
			asi.create(artistDTO);
			return ResponseEntity.status(HttpStatus.CREATED).body("新增成功");
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
	}
	
	@PutMapping(value ="/editArtist", consumes = "application/json")
    public ResponseEntity<?> updateArtist(@RequestBody ArtistDTO artistDTO){
		asi.update(artistDTO);
        return ResponseEntity.status(HttpStatus.OK).body("修改成功");
    }
	
	
	@DeleteMapping("/{artistId}")
	public ResponseEntity<Void> deleteArtistById(@PathVariable String artistId) {
		asi.deleteByArtistId(artistId);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

}
