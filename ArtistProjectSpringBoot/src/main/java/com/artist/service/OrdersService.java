package com.artist.service;

import java.time.LocalDateTime;
import java.util.List;

import com.artist.dto.request.RecipientInformation;
import com.artist.dto.response.OrdersDTO;
import com.artist.dto.response.PaintingDTO;
import com.artist.dto.response.WinningRecords;

public interface OrdersService {
	
	public String create(LocalDateTime orderDate, String customerId, Integer serviceFee, Integer deposit,
			Integer totalAmount);

	List<WinningRecords> getAllWinningRecordsByCustomerId(String customerId);

	public List<?> getAll();

	public OrdersDTO getOneByOrdernumber(String ordernumber);

	public void updateOrderInfo(RecipientInformation recipient);

	public void update(OrdersDTO ordersDTO);

	public void delete(String orderId);

	public void finalizeHighestBidAsOrder(PaintingDTO painting, LocalDateTime removeDate);

}
