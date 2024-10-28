package com.artist.service.impl;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.artist.dto.response.BiddingHistoryDTO;
import com.artist.dto.response.BidrecordDTO;
import com.artist.dto.response.FinalBiddingList;
import com.artist.dto.response.PaintingDTO;
import com.artist.dto.response.TopBiddingsDTO;
import com.artist.dto.response.WalletDTO;
import com.artist.entity.Bidrecord;
import com.artist.entity.Customers;
import com.artist.repository.BidrecordRepository;
import com.artist.service.BidrecordService;

@Service
public class BidrecordServiceImpl implements BidrecordService {
	@Autowired
	BidrecordRepository brr;
	@Autowired
	PaintingsServiceImpl psi;
	@Autowired
	CustomersServiceImpl csi;
	@Lazy
	@Autowired
	OrdersServiceImpl osi;
	@Autowired
	EmailServiceImpl esi;

	@Value("${paintings.upload.date.totalday}")
	private int totalDay;

	@Value("${paintings.upload.date.canbidday}")
	private int canBidDay;
	private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

	@Override
	@Transactional
	public void bidding(String paintingId, String bidderId, Double bidAmount) {
		PaintingDTO paintings = psi.getByPaintingsId(paintingId);

		LocalDateTime bidTime = LocalDateTime.now();
		Boolean isWinningBid = true;
		Double deposit = bidAmount / 10;
		Bidrecord bidrecord = new Bidrecord(paintingId, bidderId, "In Bidding", bidTime, bidAmount, isWinningBid,
				deposit, "pending", 0.0);
		List<Bidrecord> binddinglist = brr.findByPaintingIdOrderByBidAmountDesc(paintingId);
		Double price = paintings.getPrice();

		long delay = 0;
		long remiantime;
		if (bidAmount <= price) {
			throw new RuntimeException("出價需大於底價");
		} else if (binddinglist.isEmpty()) {
			brr.save(bidrecord);

			LocalDateTime uploadDate = paintings.getUploadDate();
			LocalDateTime removeDate = uploadDate.plusDays(14);
			delay = Duration.between(LocalDateTime.now(), removeDate).toMillis();
			System.out.println("Scheduling removal task: " + paintings.getPaintingId() + "，延遲：" + delay + " 毫秒");

			scheduler.schedule(() -> {
				try {
					osi.finalizeHighestBidAsOrder(paintings, removeDate);
					psi.setSatusfinished(paintings.getPaintingId());
					System.out.println("商品已自動下架：" + paintings.getPaintingId());
				} catch (Exception e) {
					e.printStackTrace();
				}
				esi.sendAuctionWinningEmail(paintings.getPaintingId());
			}, delay, TimeUnit.MILLISECONDS);

			remiantime = delay - 3600000;
			System.out.println("新增一個快結標前通知 removal task: " + paintings.getPaintingId() + "，延遲：" + remiantime + " 毫秒");
			scheduler.schedule(() -> {
				try {
					esi.sendAuctionRemiderEmail();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}, remiantime, TimeUnit.MILLISECONDS);

		} else if (bidAmount > (binddinglist.get(0).getBidAmount())) {
			brr.save(bidrecord);

			Bidrecord oldwinningBid = binddinglist.get(0);
			oldwinningBid.setIsWinningBid(false);
			oldwinningBid.setRefundAmount(oldwinningBid.getDeposit());
			oldwinningBid.setRefundDate(LocalDateTime.now());
			oldwinningBid.setDepositStatus("refunded");
			brr.save(oldwinningBid);

			Customers customer = csi.getByCustomerId(oldwinningBid.getBidderId());
			Double bankBalance = customer.getBankBalance();
			bankBalance += oldwinningBid.getDeposit();
			customer.setBankBalance(bankBalance);
			csi.update(customer);

			remiantime = delay - 3600000;
			System.out.println("新增一個快結標前通知 removal task: " + paintings.getPaintingId() + "，延遲：" + remiantime + " 毫秒");
			scheduler.schedule(() -> {
				try {
					esi.sendAuctionRemiderEmail();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}, remiantime, TimeUnit.MILLISECONDS);

		} else {
			throw new RuntimeException("需高於最高價");
		}

	}

	@Override
	public List<BidrecordDTO> getAllBiddingHistoryByPaintings(String paintingId) {
		List<Bidrecord> binddinglist = brr.findByPaintingIdOrderByBidAmountDesc(paintingId);
		List<BidrecordDTO> bidrecordDTOList = new ArrayList<>();

		for (Bidrecord b : binddinglist) {
			BidrecordDTO bidrecordDTO = new BidrecordDTO();
			bidrecordDTO.setNickName(csi.getByCustomerId(b.getBidderId()).getNickName());
			bidrecordDTO.setBidTime(b.getBidTime());
			bidrecordDTO.setBidAmount(b.getBidAmount());
			bidrecordDTOList.add(bidrecordDTO);
		}
		return bidrecordDTOList;
	}

	@Override
	public List<BiddingHistoryDTO> getAllBiddingHistoryBycustomerId(String bidderId, String nickname) {
		List<BiddingHistoryDTO> bidrecordDTOList = new ArrayList<>();
		List<Bidrecord> Bidderlist = brr.findByBidderIdOrderByBidTimeDesc(bidderId);

		for (Bidrecord b : Bidderlist) {

			PaintingDTO paintings = psi.getByPaintingsId(b.getPaintingId());
			paintings.getArtisName();
			paintings.getSmallUrl();
			BiddingHistoryDTO historyDTO = new BiddingHistoryDTO();
			historyDTO.setNickName(nickname);
			historyDTO.setPaintingId(b.getPaintingId());
			historyDTO.setBidAmount(b.getBidAmount());
			historyDTO.setBidTime(b.getBidTime());
			historyDTO.setPaintingName(paintings.getPaintingName());
			historyDTO.setArtisName(paintings.getArtisName());
			historyDTO.setSmallUrl(paintings.getSmallUrl());
			historyDTO.setStatus("競標中");
			bidrecordDTOList.add(historyDTO);
		}

		return bidrecordDTOList;
	}

	@Override
	public List<WalletDTO> getDepositRecord(String bidderId, String depositStatus) {
		List<WalletDTO> walletDTOList = new ArrayList<>();
		List<Bidrecord> bidInfo = brr.findByBidderIdAndDepositStatusOrderByBidTime(bidderId, depositStatus);
		for (Bidrecord b : bidInfo) {
			WalletDTO walletDTO = new WalletDTO();
			walletDTO.setRefundDate(b.getRefundDate());
			walletDTO.setRefundAmount(b.getRefundAmount());
			walletDTOList.add(walletDTO);
		}

		return walletDTOList;
	}

	@Override
	public List<TopBiddingsDTO> getTopBidding(int size) {

		List<Object[]> results = brr.findTopBiddingWithLimit(totalDay, size);

		return results.stream().map(result -> new TopBiddingsDTO((String) result[0], (Long) result[1]))
				.collect(Collectors.toList());
	}

	public List<FinalBiddingList> getFinalBiddingList() {

		List<Object[]> results = brr.findBidderForFinalBidding(totalDay);
		List<FinalBiddingList> finalBiddingList = new ArrayList<>();

		for (Object[] result : results) {
			FinalBiddingList bidding = new FinalBiddingList();
			bidding.setPaintingId((String) result[0]);
			bidding.setPaintingName((String) result[1]);
			bidding.setBidderId((String) result[2]);
			Timestamp timestamp = (Timestamp) result[3];
			LocalDateTime bidLastTime = timestamp.toLocalDateTime();
			bidding.setBidLastTime(bidLastTime);
			Timestamp timestamp2 = (Timestamp) result[4];
			LocalDateTime auctionClosedTime = timestamp2.toLocalDateTime();
			bidding.setAuctionClosedTime(auctionClosedTime);
			bidding.setBidAmount((Double) result[5]);
			bidding.setName((String) result[6]);
			bidding.setEmail((String) result[7]);
			bidding.setCurrentHighestBidAmount((Double) result[8]);
			finalBiddingList.add(bidding);
		}

		return finalBiddingList;
	}

}
