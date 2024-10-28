package com.artist.config;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.artist.dto.response.PaintingDTO;
import com.artist.repository.BidrecordRepository;
import com.artist.repository.PaintingsRepository;
import com.artist.service.impl.EmailServiceImpl;
import com.artist.service.impl.OrdersServiceImpl;
import com.artist.service.impl.PaintingsServiceImpl;

@Component
public class InitService implements CommandLineRunner {

	@Autowired
	PaintingsServiceImpl psi;
	@Autowired
	PaintingsRepository ptr;
	@Autowired
	BidrecordRepository brr;
	@Autowired
	OrdersServiceImpl osi;
	@Autowired
	EmailServiceImpl esi;

	private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

	@Override
	public void run(String... args) throws Exception {
		System.out.println("InitService is running...");
		initializeAllPaintings();
	}

	public void initializeAllPaintings() {
		List<PaintingDTO> allPaintings = psi.getPaintingsByBidrecords();
		
		System.out.println("Load the number of paintings scheduled for removal :" + allPaintings.size());

		for (PaintingDTO painting : allPaintings) {
			LocalDateTime uploadDate = painting.getUploadDate();
			LocalDateTime removeDate = uploadDate.plusDays(14);
			long delay = Duration.between(LocalDateTime.now(), removeDate).toMillis();

			if (delay <= 0) {
				psi.setSatusfinished(painting.getPaintingId());
				osi.finalizeHighestBidAsOrder(painting, removeDate);

				esi.sendAuctionWinningEmail(painting.getPaintingId());
				System.out.println("商品已自動下架：" + painting.getPaintingId());
			}
		
			if (delay > 0) {
				long remiantime = delay - 3600000;
				if (remiantime > 0) {
					System.out.println("Scheduling 截標倒數24小時" + painting.getPaintingId() + "，延遲：" + remiantime + " 毫秒");

					scheduler.schedule(() -> {
						try {
							esi.sendAuctionRemiderEmail();
						} catch (Exception e) {
							e.printStackTrace();
						}

					}, remiantime, TimeUnit.MILLISECONDS);
				}

				System.out.println("Scheduling removal task: " + painting.getPaintingId() + "，延遲：" + delay + " 毫秒");

				scheduler.schedule(() -> {
					try {
						osi.finalizeHighestBidAsOrder(painting, removeDate);
						psi.setSatusfinished(painting.getPaintingId());
						System.out.println("商品已自動下架：" + painting.getPaintingId());
					} catch (Exception e) {
						e.printStackTrace();
					}

					esi.sendAuctionWinningEmail(painting.getPaintingId());

				}, delay, TimeUnit.MILLISECONDS);
			}
		}
	}
}
