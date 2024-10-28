package com.artist.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.artist.entity.OrderDetails;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, String>{

	  Optional<OrderDetails> findByPaintingId(String paintingId);

	  Optional<OrderDetails> findByOrderNumber(String orderNumber);
	  
	  @Query("SELECT o FROM OrderDetails o WHERE o.paintingId = :paintingId")
	  Optional<OrderDetails> findOrderNumberWithPaintings(@Param("paintingId") String paintingId);


}
