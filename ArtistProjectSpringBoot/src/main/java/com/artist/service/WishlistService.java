package com.artist.service;

import java.util.List;

import com.artist.dto.response.TopFavoritesDTO;
import com.artist.dto.response.WishlistDTO;

public interface WishlistService {

	void addToWishlist(String customerId, String paintingId);

	List<WishlistDTO> findAllWishlistWithPaintings(String customerId);

	List<TopFavoritesDTO> getTopFavorites(String customerId, int size);

	List<TopFavoritesDTO> getTopFavorites(int size);

	void deleteFromWishlist(String customerId, String paintingId);

	boolean existsBycustomerIdAndpaintingId(String customerId, String paintingId);

}
