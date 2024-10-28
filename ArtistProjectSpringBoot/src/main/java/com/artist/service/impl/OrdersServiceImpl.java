package com.artist.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.artist.dto.request.RecipientInformation;
import com.artist.dto.response.OrdersDTO;
import com.artist.dto.response.PaintingDTO;
import com.artist.dto.response.WinningRecords;
import com.artist.entity.Bidrecord;
import com.artist.entity.Orders;
import com.artist.repository.BidrecordRepository;
import com.artist.repository.CustomersRepository;
import com.artist.repository.OrderDetailsRepository;
import com.artist.repository.OrdersRepository;
import com.artist.service.OrdersService;
import com.artist.utils.IdGenerator;

@Service
public class OrdersServiceImpl implements OrdersService {

	@Autowired
	private OrdersRepository or;
	@Autowired
	private OrderDetailsRepository odr;
	@Autowired
	BidrecordRepository brr;
	@Lazy
	@Autowired
	EmailServiceImpl esi;
	@Autowired
	OrderDetailsServiceImpl odsi;
	@Autowired
	CustomersRepository cr;
	@Autowired
	private IdGenerator idGenerator;

	@Override
	public String create(LocalDateTime orderDate, String customerId, Integer serviceFee, Integer deposit,
			Integer totalAmount) {
		Orders order = new Orders();
		String orderNumber = idGenerator.orderId();
		order.setOrderNumber(orderNumber);
		order.setOrderDate(orderDate);
		order.setCustomerId(customerId);
		order.setServiceFee(serviceFee);
		order.setDesposit(deposit);
		order.setTotalAmount(totalAmount);
		or.save(order);
		return order.getOrderNumber();
	}

	@Override
	public void update(OrdersDTO ordersDTO) {
		String orderNum = ordersDTO.getOrderNumber();

		Optional<Orders> optionalOrder = or.findByOrderNumber(orderNum);
		if (optionalOrder.isPresent()) {
			Orders o = optionalOrder.get();
			o.setServiceFee(ordersDTO.getServiceFee());
			o.setDesposit(ordersDTO.getDesposit());
			o.setTotalAmount(ordersDTO.getTotalAmount());
			o.setDeliveryNumber(ordersDTO.getDeliveryNumber());
			or.save(o);
		} else {
			System.out.println("not find");
		}
	}

	@Transactional
	public void finalizeHighestBidAsOrder(PaintingDTO painting, LocalDateTime removeDate) {
		List<Bidrecord> binddinglist = brr.findByPaintingIdOrderByBidAmountDesc(painting.getPaintingId());

		if (binddinglist.isEmpty()) {
			System.out.println(painting.getPaintingId() + "沒有出價紀錄");
			return;
		} else {

			binddinglist.forEach(bid -> {
				bid.setStatus("Auction closed");
				brr.save(bid);
			});

			Bidrecord bidrecord = binddinglist.get(0);
			String customerId = bidrecord.getBidderId();
			Double bidAmount = bidrecord.getBidAmount();
			String orderNumber = create(removeDate, customerId, bidAmount.intValue() / 10, -bidAmount.intValue() / 10,
					bidAmount.intValue()); // 這邊拿到orderNumber
			String paintingId = bidrecord.getPaintingId();

			odsi.create(orderNumber, paintingId, bidAmount);

		}

	}

	@Override
	public List<WinningRecords> getAllWinningRecordsByCustomerId(String customerId) {
		List<Orders> orderList = or.findByCustomerId(customerId);
		List<WinningRecords> WinningRecordslist = new ArrayList<>();

		if (orderList.isEmpty()) {
			return null;
		} else {
			for (Orders o : orderList) {

				WinningRecords winningRecords = new WinningRecords();
				winningRecords.setOrderNumber(o.getOrderNumber());
				winningRecords.setPaintingId(o.getOrderDetail().getPaintingId());
				winningRecords.setPaintingName(o.getOrderDetail().getPainting().getPaintingName());
				winningRecords.setPrice(o.getOrderDetail().getPrice() * 0.9);// 收剩下的9成
				winningRecords.setSmallUrl(o.getOrderDetail().getPainting().getSmallUrl());
				winningRecords.setArtistId(o.getOrderDetail().getPainting().getArtist().getArtistId());
				winningRecords.setArtisName(o.getOrderDetail().getPainting().getArtist().getArtistName());
				WinningRecordslist.add(winningRecords);
			}
		}
		return WinningRecordslist;

	}

	@Override
	public void delete(String orderId) {
		odr.deleteById(orderId);
		or.deleteById(orderId);
	}

	@Override
	public List<Orders> getAll() {
		List<Orders> orderList = or.findAll();
		if (orderList.isEmpty()) {
			return null;
		} else {
			return orderList;
		}
	}

	@Override
	public OrdersDTO getOneByOrdernumber(String ordernumber) {
		Optional<Orders> optionalOrder = or.findByOrderNumber(ordernumber);
		if (optionalOrder.isPresent()) {
			Orders o = optionalOrder.get();
			OrdersDTO ordersDTO = new OrdersDTO();
			ordersDTO.setOrderNumber(o.getOrderNumber());
			ordersDTO.setOrderDate(o.getOrderDate());
			ordersDTO.setCustomerId(o.getCustomerId());

			return ordersDTO;
		} else {
			System.out.println("not find");
			return null;
		}
	}

	@Override
	public void updateOrderInfo(RecipientInformation recipient) {

	}

}
