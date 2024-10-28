package com.artist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.artist.dto.request.WishlistRequest;
import com.artist.dto.response.WishlistDTO;
import com.artist.service.impl.CustomersServiceImpl;
import com.artist.service.impl.WishlistServiceImpl;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistContorller {

	@Autowired
	private WishlistServiceImpl wsi;
	@Autowired
	private CustomersServiceImpl csi;

	@PostMapping
	public ResponseEntity<Void> addToWishlist(@RequestHeader("Authorization") String token,
			@RequestBody WishlistRequest request) {
		String customerId = csi.getCustomerIdFromToken(token);
		String paintingId = request.getPaintingId();
		wsi.addToWishlist(customerId, paintingId);
		return ResponseEntity.status(HttpStatus.CREATED).build();

	}

	@GetMapping
	public ResponseEntity<List<WishlistDTO>> getAllWishlist(@RequestHeader("Authorization") String token) {
		String customerId = csi.getCustomerIdFromToken(token);
		List<WishlistDTO> allWishlistWithPaintings = wsi.findAllWishlistWithPaintings(customerId);
		return ResponseEntity.ok(allWishlistWithPaintings);
	}

	@DeleteMapping("/{paintingId}")
	public ResponseEntity<Void> deleteFromWishlist(@RequestHeader("Authorization") String token,
			@PathVariable String paintingId) {
		String customerId = csi.getCustomerIdFromToken(token);
		wsi.deleteFromWishlist(customerId, paintingId);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

}
