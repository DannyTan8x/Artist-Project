package com.artist.service;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.artist.dto.request.DeliveryOrderRequestDTO;
import com.artist.dto.response.DeliveryOrderResponseDTO;
import com.artist.dto.response.DeliveryOrdersDTO;
import com.artist.dto.response.MyOrderResponse;

public interface DeliveryOrdersService {

	String createDeliveryOrder(DeliveryOrderRequestDTO deliveryOrderRequestDTO);

	List<DeliveryOrderResponseDTO> getAllWithOrders();

	DeliveryOrderResponseDTO getByOrderNumber(String deliveryNumber);

	List<DeliveryOrderResponseDTO> getByStatusWithOrdersAndDetails(String status);

	String getPackageStaffName(String staffId);

	String getDeliveryStaffName(String staffId);

	void update(DeliveryOrdersDTO DOrdersfDTO);

	List<MyOrderResponse> getByDeliveryNumberAndCustomer(@Param("customerId") String customerId);

}
