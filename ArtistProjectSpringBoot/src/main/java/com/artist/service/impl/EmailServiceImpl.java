package com.artist.service.impl;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.artist.dto.response.FinalBiddingList;
import com.artist.entity.OrderDetails;
import com.artist.entity.Orders;
import com.artist.repository.OrderDetailsRepository;
import com.artist.repository.OrdersRepository;
import com.artist.service.EmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private final JavaMailSender mailSender;

	@Value("${jwt.secret}")
	private String jwtSecret;

	@Autowired
	private OrdersRepository or;

	@Autowired
	private OrderDetailsRepository odr;

	@Autowired
	private PaintingsServiceImpl psi;
	@Lazy
	@Autowired
	private BidrecordServiceImpl bsi;

	public EmailServiceImpl(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}

	public void sendPasswordResetEmail(String email, String resetLink) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(email);
		message.setSubject("Artist重置密碼請求");
		message.setText("我們收到您更改密碼的請求。如果您希望重置密碼，請點擊下方按鈕。如果這不是您的操作，請忽略此郵件。\n" + resetLink + "\n請注意，此鏈接將在 15分鐘內過期。");

		mailSender.send(message);
	}

	public void sendAuctionWinningEmail(String painting) {
		Optional<OrderDetails> orderNumberWithPaintings = odr.findOrderNumberWithPaintings(painting);
		if (orderNumberWithPaintings.isEmpty()) {
			System.out.println("信件寄發異常：訂單不存在");
			return;
		}
		OrderDetails orderDetails = orderNumberWithPaintings.get();
		String orderNumber = orderDetails.getOrderNumber();
		Optional<Orders> ordersOptional = or.findByOrderNumber(orderNumber);

		if (ordersOptional.isEmpty()) {
			System.out.println("信件寄發異常：訂單不存在");
			return;
		}

		Orders order = ordersOptional.get();
		String email = order.getCustomer().getEmail();
		LocalDateTime endTime = order.getOrderDate();
		String paintingName = orderDetails.getPainting().getPaintingName();
		String paintingId = orderDetails.getPainting().getPaintingId();
		Double winningPrice = orderDetails.getPrice();
		String paymentLink = "http://localhost:5173/home/cusdashboard/winningRecords";
		String base64Image = "";

		byte[] imageData = psi.getPaintingBlob(paintingId);
		if (imageData != null) {
			base64Image = Base64.getEncoder().encodeToString(imageData);
		} else {
			System.err.println("圖片數據為空，無法添加圖片");
		}

		MimeMessage mimeMessage = mailSender.createMimeMessage();
		MimeMessageHelper helper;
		try {
			helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

			helper.setSubject("Artist 恭喜您！您已贏得拍賣品");

			helper.setTo(email);

			helper.setFrom("artistjava2024@gmail.com");

			String plainText = "親愛的用戶，恭喜您贏得了拍賣品 '" + paintingName + "'。" + "請在拍賣結束後 24 小時內確認付款資訊。" + "付款資訊連結："
					+ paymentLink;
			String htmlText = "<div style=\"max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9;\">"
					+ "<h2 style=\"text-align: center; color: #4CAF50;\">恭喜！您已成功贏得拍賣品</h2>" + "<p>親愛的用戶：</p>"
					+ "<p>您已成功贏得拍品 <strong>" + paintingName + "</strong>。以下是相關信息：</p>";

			if (!base64Image.isEmpty()) {
				htmlText += "<img src='data:image/jpeg;base64," + base64Image
						+ "' style='width:150px;height:auto;display:block;margin:auto;' />";
			}

			htmlText += "<ul><li><strong>拍賣編號：</strong>" + paintingId + "</li>" + "<li><strong>得標價格：</strong>"
					+ winningPrice + " 元</li>" + "<li><strong>拍賣結束時間：</strong>" + endTime + "</li></ul>"
					+ "<p>請在 24 小時內確認付款資訊，以確保交易有效。您可以點擊下方按鈕來確認：</p>" + "<p style=\"text-align: center;\"><a href=\""
					+ paymentLink
					+ "\" style=\"padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;\">立即付款</a></p>"
					+ "<p>如果按鈕無法點擊，請複製以下連結並於瀏覽器中開啟：</p>" + "<p style=\"word-break: break-all;\"><a href=\""
					+ paymentLink + "\">" + paymentLink + "</a></p>" + "<p>謝謝您參與我們的拍賣活動！</p>" + "<p>Artist 團隊</p>"
					+ "<hr>" + "<p style=\"font-size: 0.9em; color: #555;\">此郵件為系統自動發送，請勿回覆。</p>" + "</div>";

			helper.setText(plainText, htmlText);
			mailSender.send(mimeMessage);
		} catch (MessagingException e) {
			System.err.println("發送郵件失敗：" + e.getMessage());
			e.printStackTrace();
		}
	}

	public void sendAuctionRemiderEmail() {

		List<FinalBiddingList> finalBiddingList = bsi.getFinalBiddingList();

		if (finalBiddingList.isEmpty()) {
			System.out.println("信件寄發異常：訂單不存在");
			return;
		}

		for (FinalBiddingList finalBidding : finalBiddingList) {

			String email = finalBidding.getEmail();
			String customerName = finalBidding.getName();
			String paintingName = finalBidding.getPaintingName();
			String paintingId = finalBidding.getPaintingId();
			String bidderId = finalBidding.getBidderId();
			LocalDateTime bidLastTime = finalBidding.getBidLastTime();
			LocalDateTime auctionUploadTime = finalBidding.getAuctionClosedTime();
			LocalDateTime endTime = finalBidding.getAuctionClosedTime().plusDays(14);
			Double bidAmount = finalBidding.getBidAmount();
			Double currentHighestBidAmount = finalBidding.getCurrentHighestBidAmount();
			String auctionLink = "http://localhost:5173/home/auction/" + paintingId;

			MimeMessage mimeMessage = mailSender.createMimeMessage();
			MimeMessageHelper helper;
			try {
				helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

				helper.setSubject("提醒：您競標的拍賣即將結束！剩餘一小時！");

				helper.setTo(email);

				helper.setFrom("artistjava2024@gmail.com");

				String plainText = "親愛的'" + customerName + "' 您好，" + "感謝您參與我們的拍賣活動！我們想提醒您，您所競標的拍品 '" + paintingName
						+ "' 即將結標，距離拍賣結束僅剩下1小時！";
				String htmlText = "<div style=\"max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9;\">"

						+ "<p>您投標的拍品 <strong>" + paintingName + "</strong>。相關信息：</p>";

				htmlText += "<ul><li><strong>拍賣編號：</strong>" + paintingId + "</li>" + "<li><strong>當前最高出價：</strong>"
						+ currentHighestBidAmount + " 元</li>" + "<li><strong>拍賣將於 ：" + endTime
						+ " 結束。如果您希望繼續保持競爭力，請盡快檢查拍品頁面並更新您的出價！</strong></li>" + "<li><strong>您在：" + bidLastTime
						+ " 最後出價 ：" + bidAmount + "</strong></li>" + "</ul>" + "<p>您可以通過以下連結直接查看拍賣詳情： 拍品詳情連結：</p>"
						+ "<p style=\"text-align: center;\"><a href=\"" + auctionLink
						+ "\" style=\"padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;\">作品詳細</a></p>"
						+ "<p>祝您競標順利，期待您成為這件拍品的得標者！</p>" + "<p style=\"word-break: break-all;\"><a href=\""
						+ auctionLink + "\">" + auctionLink + "</a></p>" + "<p>如有任何疑問，歡迎隨時聯繫我們的客服團隊。</p>"
						+ "<p>謝謝您對我們拍賣平台的支持！</p>" + "<p>Artist 團隊 敬祝</p>" + "<hr>"
						+ "<p style=\"font-size: 0.9em; color: #555;\">此郵件為系統自動發送，請勿回覆。</p>" + "</div>";

				helper.setText(plainText, htmlText);
				mailSender.send(mimeMessage);
			} catch (MessagingException e) {
				System.err.println("發送郵件失敗：" + e.getMessage());
				e.printStackTrace();
			}
		}

	}

}
