package com.artist.service;

import java.util.List;

import com.artist.dto.response.BiddingHistoryDTO;
import com.artist.dto.response.BidrecordDTO;
import com.artist.dto.response.TopBiddingsDTO;
import com.artist.dto.response.WalletDTO;

public interface BidrecordService {

	void bidding(String paintingId, String bidderId, Double bidAmount);

	public List<BidrecordDTO> getAllBiddingHistoryByPaintings(String paintingId);

	List<BiddingHistoryDTO> getAllBiddingHistoryBycustomerId(String bidderId, String nickname);

	public List<WalletDTO> getDepositRecord(String bidderId, String depositStatus);

	List<TopBiddingsDTO> getTopBidding(int size);

}
