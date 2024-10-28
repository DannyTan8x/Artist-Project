package com.artist.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.artist.entity.OrderDetails;
import com.artist.repository.OrderDetailsRepository;
import com.artist.service.OrderDetailsService;
@Service
public class OrderDetailsServiceImpl implements OrderDetailsService{


	
	@Autowired
	OrderDetailsRepository odr;

	@Override
	public void create(String orderNumber,String paintingId,Double bidAmount) {
		OrderDetails orderDetail = new OrderDetails();
		orderDetail.setOrderNumber(orderNumber);
		orderDetail.setPaintingId(paintingId);
		orderDetail.setPrice(bidAmount);
		odr.save(orderDetail);
	}
	
	public OrderDetails getByPaintingId(String paintingId){
		Optional<OrderDetails> byPaintingId = odr.findByPaintingId(paintingId);
		if (byPaintingId.isPresent()) {
			OrderDetails orderDetails = byPaintingId.get();			
			return orderDetails;
		}
		return null;
		}

	}
	

