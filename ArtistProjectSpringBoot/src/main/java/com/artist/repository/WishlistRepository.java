package com.artist.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.artist.entity.Wishlist;
import com.artist.entity.WishlistId;

import jakarta.persistence.Tuple;

public interface WishlistRepository extends JpaRepository<Wishlist, WishlistId> {
	List<Wishlist> findAllById_CustomerId(String customerId);

	void deleteById_CustomerIdAndId_PaintingId(String customerId, String paintingId);

	boolean existsById_CustomerIdAndId_PaintingId(String customerId, String paintingId);

	@Query(value = "SELECT w.painting_id AS paintingId, COUNT(w.painting_id) AS paintingCount " + "FROM wishlist w "
			+ "JOIN paintings p ON w.painting_id = p.painting_id "
			+ "WHERE p.upload_date > NOW() - INTERVAL :totalDay DAY " + "GROUP BY w.painting_id "
			+ "ORDER BY COUNT(w.painting_id) DESC", nativeQuery = true)
	List<Tuple> findTopFavoritesWithLimit(Pageable pageable, @Param("totalDay") int totalDay);

	@Query(value = "SELECT w.painting_id AS paintingId, COUNT(w.painting_id) AS paintingCount " + "FROM wishlist w "
			+ "JOIN paintings p ON w.painting_id = p.painting_id "
			+ "WHERE p.upload_date > NOW() - INTERVAL :totalDay DAY " + "AND w.painting_id NOT IN "
			+ "(SELECT wl.painting_id FROM wishlist wl WHERE wl.customer_id = :customerId) " + "GROUP BY w.painting_id "
			+ "ORDER BY COUNT(w.painting_id) DESC", nativeQuery = true)
	List<Tuple> findTopFavoritesWithLimit(@Param("customerId") String customerId, Pageable pageable,
			@Param("totalDay") int totalDay);

}