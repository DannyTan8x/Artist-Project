package com.artist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.artist.entity.Bidrecord;

public interface BidrecordRepository extends JpaRepository<Bidrecord,Long> {
	
	
  List<Bidrecord> findByPaintingIdOrderByBidAmountDesc(String paintingId);

  List<Bidrecord> findByBidderIdOrderByBidTimeDesc(String bidderId);

  List<Bidrecord> findByBidderIdAndDepositStatusOrderByBidTime(String bidderId, String depositStatus);
  
  List<Bidrecord> findByPaintingId(String paintingId); 
  
	
	@Query(value = "SELECT b.painting_id AS paintingId, COUNT(b.painting_id) AS paintingCount " +
            "FROM bidrecord b " +
            "JOIN paintings p ON b.painting_id = p.painting_id " +
            "WHERE p.upload_date > NOW() - INTERVAL :canbidday DAY " +
            "GROUP BY b.painting_id " +
            "ORDER BY COUNT(b.painting_id) DESC " +
            "LIMIT :limit", 
    nativeQuery = true)
	List<Object[]> findTopBiddingWithLimit(@Param("canbidday") int canbidday, @Param("limit") int limit);

	
	@Query(value = "SELECT "
	        + "b.painting_id, "
	        + "p.painting_name, "
	        + "b.bidder_id, "
	        + "MAX(b.bid_time) AS latest_bid_time, "
	        + "p.upload_date, "
	        + "MAX(b.bid_amount) AS latest_bid_amount, "
	        + "c.`name`, "
	        + "c.email, "
	        + "(SELECT MAX(b2.bid_amount) FROM bidrecord b2 WHERE b2.painting_id = b.painting_id) AS highest_bid_amount "
	        + "FROM bidrecord b "
	        + "JOIN Paintings p ON b.painting_id = p.painting_id "
	        + "JOIN customers c ON b.bidder_id = c.customer_id "
	        + "WHERE b.status = 'In Bidding' AND p.upload_date > NOW() - INTERVAL :totalDay DAY "
	        + "GROUP BY b.painting_id,p.painting_name, b.bidder_id, b.status, p.upload_date, c.`name`, c.email ",
	        nativeQuery = true)
	List<Object[]> findBidderForFinalBidding(@Param("totalDay") int totalDay);

}
