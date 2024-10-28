package com.artist.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.artist.dto.response.PaintingDTO;
import com.artist.dto.response.TopFavoritesDTO;
import com.artist.dto.response.WishlistDTO;
import com.artist.entity.Customers;
import com.artist.entity.Wishlist;
import com.artist.repository.WishlistRepository;
import com.artist.service.WishlistService;

import jakarta.persistence.Tuple;

@Service
public class WishlistServiceImpl implements WishlistService {

	@Autowired
	private WishlistRepository wr;
	@Autowired
	private PaintingsServiceImpl psi;
	@Autowired
	private CustomersServiceImpl csi;
	@Value("${paintings.upload.date.totalday}")
	private int totalDay;

	@Value("${paintings.upload.date.canbidday}")
	private int canBidDay;

	@Override
	public List<WishlistDTO> findAllWishlistWithPaintings(String customerId) {
		List<WishlistDTO> wishlistDTOList = new ArrayList<>();
		List<Wishlist> allwish = wr.findAllById_CustomerId(customerId);
		for (Wishlist w : allwish) {
			String paintingId = w.getId().getPaintingId();
			PaintingDTO paintings = psi.getByPaintingsId(paintingId);
			WishlistDTO wishlistDTO = new WishlistDTO();
			wishlistDTO.setPaintingId(paintingId);
			wishlistDTO.setPaintingName(paintings.getPaintingName());
			wishlistDTO.setArtisName(paintings.getArtisName());
			wishlistDTO.setPrice(paintings.getPrice());
			wishlistDTO.setSmallUrl(paintings.getSmallUrl());
			wishlistDTO.setImage(paintings.getImage());

			wishlistDTOList.add(wishlistDTO);
		}
		return wishlistDTOList;
	}

	@Override
	@Transactional
	public void deleteFromWishlist(String customerId, String paintingId) {
		wr.deleteById_CustomerIdAndId_PaintingId(customerId, paintingId);
	}

	@Override
	public void addToWishlist(String customerId, String paintingId) {
		Customers customer = csi.getByCustomerId(customerId);
		if (psi.existsBypaintingId(paintingId)) {
			Wishlist wishlist = new Wishlist(customerId, paintingId);
			wishlist.setCustomer(customer);
			wr.save(wishlist);
		} else {
			System.out.println("畫作id不存在");
			throw new IllegalArgumentException("畫作ID不存在: " + paintingId);
		}
	}

	@Override
	public boolean existsBycustomerIdAndpaintingId(String customerId, String paintingId) {

		return wr.existsById_CustomerIdAndId_PaintingId(customerId, paintingId);

	}

	@Override
	public List<TopFavoritesDTO> getTopFavorites(String customerId, int size) {
		Pageable pageable = PageRequest.of(0, size);
		List<Tuple> results = wr.findTopFavoritesWithLimit(customerId, pageable, totalDay);
		return results.stream().map(tuple -> new TopFavoritesDTO(tuple.get("paintingId", String.class),
				tuple.get("paintingCount", Long.class))).collect(Collectors.toList());
	}

	@Override
	public List<TopFavoritesDTO> getTopFavorites(int size) {
		Pageable pageable = PageRequest.of(0, size);
		List<Tuple> results = wr.findTopFavoritesWithLimit(pageable, totalDay);
		return results.stream().map(tuple -> new TopFavoritesDTO(tuple.get("paintingId", String.class),
				tuple.get("paintingCount", Long.class))).collect(Collectors.toList());
	}

}
