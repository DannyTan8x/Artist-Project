package com.artist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.artist.dto.request.BiddingRequest;
import com.artist.dto.response.BiddingHistoryDTO;
import com.artist.dto.response.BiddingHistoryResponse;
import com.artist.dto.response.BidrecordDTO;
import com.artist.dto.response.PaintingDTO;
import com.artist.service.impl.BidrecordServiceImpl;
import com.artist.service.impl.CustomersServiceImpl;
import com.artist.service.impl.PaintingsServiceImpl;

@RestController
@RequestMapping("/api/bidding")
public class BidrecordController {

	@Autowired
	private PaintingsServiceImpl psi;
	@Autowired
	private CustomersServiceImpl csi;
	@Autowired
	private BidrecordServiceImpl bsi;

	@PostMapping(value = "/bid", consumes = "application/json")
	public ResponseEntity<String> bidding(@RequestHeader("Authorization") String token,
			@RequestBody BiddingRequest request) {
		try {
			String bidderId = csi.getCustomerIdFromToken(token);
			String paintingId = request.getPaintingId();
			Double bidAmount = request.getBidAmount();
			bsi.bidding(paintingId, bidderId, bidAmount);
			return ResponseEntity.status(HttpStatus.CREATED).body("出價成功");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}

	}

	@GetMapping("/{paintingId}")
	public ResponseEntity<BiddingHistoryResponse> getAuctionBiddingHistory(@PathVariable String paintingId) {

		List<BidrecordDTO> biddingHistory = bsi.getAllBiddingHistoryByPaintings(paintingId);
		PaintingDTO painting = psi.getByPaintingsId(paintingId);
		if (biddingHistory.isEmpty()) {
			BiddingHistoryResponse response = new BiddingHistoryResponse(painting, biddingHistory);
			return ResponseEntity.ok(response);
		}else {
			painting.setPrice(biddingHistory.get(0).getBidAmount());
			BiddingHistoryResponse response = new BiddingHistoryResponse(painting, biddingHistory);
			return ResponseEntity.ok(response);
		}
	}

	@GetMapping("/history")
	public ResponseEntity<List<BiddingHistoryDTO>> getBidHistory(@RequestHeader("Authorization") String token) {
		String bidId = csi.getCustomerIdFromToken(token);
		String nickname = csi.getNicknameFromToken(token);
		List<BiddingHistoryDTO> biddingHistory = bsi.getAllBiddingHistoryBycustomerId(bidId, nickname);
		return ResponseEntity.ok(biddingHistory);
	}
}
