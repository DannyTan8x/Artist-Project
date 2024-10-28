package com.artist.service.impl;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.artist.dto.request.DeliveryOrderRequestDTO;
import com.artist.dto.response.DeliveryOrderResponseDTO;
import com.artist.dto.response.DeliveryOrdersDTO;
import com.artist.dto.response.MyOrderResponse;
import com.artist.dto.response.OrdersDTO;
import com.artist.dto.response.SimplePaintingDTO;
import com.artist.entity.DeliveryOrders;
import com.artist.entity.Orders;
import com.artist.repository.DeliveryOrdersRepository;
import com.artist.repository.OrdersRepository;
import com.artist.service.DeliveryOrdersService;
import com.artist.utils.IdGenerator;

@Service
public class DeliveryOrdersServiceImpl implements DeliveryOrdersService {

	@Autowired
	private IdGenerator idGenerator; // 注入 IdGenerator
	@Autowired
	private DeliveryOrdersRepository dor; // 注入 DeliveryOrderRepository

	@Autowired
	private OrdersRepository or; // 注入 OrdersRepository

	@Override
	public String createDeliveryOrder(DeliveryOrderRequestDTO deliveryOrderRequestDTO) {

		// 使用 IdGenerator 生成唯一的 Delivery ID
		String deliveryId = idGenerator.deliveryOrderId();

		try {
			// 創建 Deliveryorders 實體
			DeliveryOrders deliveryOrder = new DeliveryOrders();
			deliveryOrder.setDeliveryNumber(deliveryId);
			deliveryOrder.setCreateDate(LocalDateTime.now());

			// 設定狀態為 "待處理"
			deliveryOrder.setStatus("pending...");

			// 設置寄送資訊
			deliveryOrder.setAttName(deliveryOrderRequestDTO.getAttName());
			deliveryOrder.setAttPhone(deliveryOrderRequestDTO.getAttPhone());
			deliveryOrder.setDeliveryAddress(deliveryOrderRequestDTO.getDeliveryAddress());
			deliveryOrder.setDeliveryInstrictions(deliveryOrderRequestDTO.getDeliveryInstrictions());
			deliveryOrder.setDeliveryFee(deliveryOrderRequestDTO.getDeliveryFee());
			deliveryOrder.setTotalAmount(deliveryOrderRequestDTO.getTotalAmount());

			// 保存出貨單，保證 deliveryId 已經存在
			dor.save(deliveryOrder);

			// 更新每個訂單的 delivery_number
			updateOrdersWithDeliveryNumber(deliveryOrderRequestDTO.getOrderList(), deliveryId);

			// 返回成功訊息
			return deliveryId;

		} catch (Exception e) {
			// 返回失敗訊息
			return "出貨單成立失敗: " + deliveryId + e.getLocalizedMessage();
		}
	}

	/**
	 * 根據前端傳回的 order_number，更新每個訂單的 delivery_number
	 */
	private void updateOrdersWithDeliveryNumber(List<OrdersDTO> orderList, String deliveryId) {
		for (OrdersDTO orderDTO : orderList) {
			// 根據 order_number 查詢訂單
			Optional<Orders> optionalOrder = or.findByOrderNumber(orderDTO.getOrderNumber());
			if (optionalOrder.isPresent()) {
				Orders order = optionalOrder.get();
				// 更新訂單的 delivery_number
				order.setDeliveryNumber(deliveryId);
				// 保存更新後的訂單
				or.save(order);
			} else {
				throw new RuntimeException("訂單號 " + orderDTO.getOrderNumber() + " 找不到");
			}
		}
	}
	


	@Override
	public void update(DeliveryOrdersDTO DOrdersfDTO) {
		Optional<DeliveryOrders> Dorders = dor.findById(DOrdersfDTO.getDeliveryNumber());
		if (Dorders.isPresent()) {
			DeliveryOrders dos = Dorders.get();
			dos.setAttName(DOrdersfDTO.getAttName());
			dos.setAttPhone(DOrdersfDTO.getAttPhone());
//			dos.setCreateDate(DOrdersfDTO.getCreateDate());
			dos.setDeliveryAddress(DOrdersfDTO.getDeliveryAddress());
//			dos.setDeliveryFee(DOrdersfDTO.getDeliveryFee());
			dos.setDeliveryInstrictions(DOrdersfDTO.getDeliveryInstrictions());
			dos.setDeliveryStaff(DOrdersfDTO.getDeliveryStaff());
			dos.setPackageStaff(DOrdersfDTO.getPackageStaff());
			dos.setStatus(DOrdersfDTO.getStatus());
//			dos.setTotalAmount(DOrdersfDTO.getTotalAmount());
			dor.save(dos);
		} else {
			System.out.println("Artist is not find");
		}
	}

	@Override
	public List<DeliveryOrderResponseDTO> getAllWithOrders() {
		 List<DeliveryOrders> allWithOrders = dor.findAllWithOrdersAndDetails();
		    List<DeliveryOrderResponseDTO> responseDTOList = new ArrayList<>();

		    for (DeliveryOrders deliveryOrder : allWithOrders) {
		        DeliveryOrderResponseDTO deliveryOrderDTO = new DeliveryOrderResponseDTO();
		        deliveryOrderDTO.setDeliveryNumber(deliveryOrder.getDeliveryNumber());
		        deliveryOrderDTO.setCreateDate(deliveryOrder.getCreateDate());
		        deliveryOrderDTO.setStatus(deliveryOrder.getStatus());
		        deliveryOrderDTO.setAttName(deliveryOrder.getAttName());
		        deliveryOrderDTO.setAttPhone(deliveryOrder.getAttPhone());
		        deliveryOrderDTO.setDeliveryAddress(deliveryOrder.getDeliveryAddress());
		        deliveryOrderDTO.setDeliveryInstrictions(deliveryOrder.getDeliveryInstrictions());
		        deliveryOrderDTO.setDeliveryFee(deliveryOrder.getDeliveryFee());
		        deliveryOrderDTO.setTotalAmount(deliveryOrder.getTotalAmount());
		        deliveryOrderDTO.setPackageStaff(deliveryOrder.getPackageStaff());
		        deliveryOrderDTO.setDeliveryStaff(deliveryOrder.getDeliveryStaff());

		        // 提取訂單列表
		        List<OrdersDTO> ordersDTOList = deliveryOrder.getOrders().stream()
		            .map(order -> {
		                String paintingId = order.getOrderDetail().getPaintingId();
		                
		                return new OrdersDTO(
		                    order.getOrderNumber(),
		                    order.getOrderDate(),
		                    order.getCustomerId(),
		                    order.getServiceFee(),
		                    order.getDesposit(),
		                    order.getTotalAmount(),
		                    order.getDeliveryNumber(),
		                    paintingId
		                );
		            })
		            .collect(Collectors.toList());

		        deliveryOrderDTO.setOrderList(ordersDTOList);
		        responseDTOList.add(deliveryOrderDTO);
		    }
		    return responseDTOList;
	}
	
	@Override
	public DeliveryOrderResponseDTO getByOrderNumber(String deliveryNumber)	{
		
			Optional<DeliveryOrders> optionalDeliveryOrders = dor.findByDeliveryNumberWithOrdersAndDetails(deliveryNumber);
			if (optionalDeliveryOrders.isPresent()) {
			DeliveryOrders deliveryOrder = optionalDeliveryOrders.get();
			DeliveryOrderResponseDTO deliveryOrderDTO = new DeliveryOrderResponseDTO();
	        deliveryOrderDTO.setDeliveryNumber(deliveryOrder.getDeliveryNumber());
	        deliveryOrderDTO.setCreateDate(deliveryOrder.getCreateDate());
	        deliveryOrderDTO.setStatus(deliveryOrder.getStatus());
	        deliveryOrderDTO.setAttName(deliveryOrder.getAttName());
	        deliveryOrderDTO.setAttPhone(deliveryOrder.getAttPhone());
	        deliveryOrderDTO.setDeliveryAddress(deliveryOrder.getDeliveryAddress());
	        deliveryOrderDTO.setDeliveryInstrictions(deliveryOrder.getDeliveryInstrictions());
	        deliveryOrderDTO.setDeliveryFee(deliveryOrder.getDeliveryFee());
	        deliveryOrderDTO.setTotalAmount(deliveryOrder.getTotalAmount());
	        deliveryOrderDTO.setPackageStaff(deliveryOrder.getPackageStaff());
	        deliveryOrderDTO.setDeliveryStaff(deliveryOrder.getDeliveryStaff());
	     // 提取訂單列表
	        List<OrdersDTO> ordersDTOList = deliveryOrder.getOrders().stream()
	            .map(order -> {
	                String paintingId = order.getOrderDetail().getPaintingId();
	                
	                return new OrdersDTO(
	                    order.getOrderNumber(),
	                    order.getOrderDate(),
	                    order.getCustomerId(),
	                    order.getServiceFee(),
	                    order.getDesposit(),
	                    order.getTotalAmount(),
	                    order.getDeliveryNumber(),
	                    paintingId
	                );
	                
	            })
	            .collect(Collectors.toList());
	   
	        deliveryOrderDTO.setOrderList(ordersDTOList);
	        return deliveryOrderDTO;
		}else {
		    return null;
		}
	}

	@Override
	public List<DeliveryOrderResponseDTO> getByStatusWithOrdersAndDetails(String status) {
		 List<DeliveryOrders> allDeliveryOrdersByStatus = dor.findByStatusWithOrdersAndDetails(status);
		    List<DeliveryOrderResponseDTO> responseDTOList = new ArrayList<>();

		    for (DeliveryOrders deliveryOrder : allDeliveryOrdersByStatus) {
		        DeliveryOrderResponseDTO deliveryOrderDTO = new DeliveryOrderResponseDTO();
		        deliveryOrderDTO.setDeliveryNumber(deliveryOrder.getDeliveryNumber());
		        deliveryOrderDTO.setCreateDate(deliveryOrder.getCreateDate());
		        deliveryOrderDTO.setStatus(deliveryOrder.getStatus());
		        deliveryOrderDTO.setAttName(deliveryOrder.getAttName());
		        deliveryOrderDTO.setAttPhone(deliveryOrder.getAttPhone());
		        deliveryOrderDTO.setDeliveryAddress(deliveryOrder.getDeliveryAddress());
		        deliveryOrderDTO.setDeliveryInstrictions(deliveryOrder.getDeliveryInstrictions());
		        deliveryOrderDTO.setDeliveryFee(deliveryOrder.getDeliveryFee());
		        deliveryOrderDTO.setTotalAmount(deliveryOrder.getTotalAmount());
		        deliveryOrderDTO.setPackageStaff(deliveryOrder.getPackageStaff());
		        deliveryOrderDTO.setDeliveryStaff(deliveryOrder.getDeliveryStaff());

		        // 提取訂單列表
		        List<OrdersDTO> ordersDTOList = deliveryOrder.getOrders().stream()
		            .map(order -> {
		                String paintingId = order.getOrderDetail().getPaintingId();
		                
		                return new OrdersDTO(
		                    order.getOrderNumber(),
		                    order.getOrderDate(),
		                    order.getCustomerId(),
		                    order.getServiceFee(),
		                    order.getDesposit(),
		                    order.getTotalAmount(),
		                    order.getDeliveryNumber(),
		                    paintingId
		                );
		            })
		            .collect(Collectors.toList());

		        deliveryOrderDTO.setOrderList(ordersDTOList);
		        responseDTOList.add(deliveryOrderDTO);
		    }
		    return responseDTOList;
	}

	@Override
	public String getPackageStaffName(String staffId) {
		return dor.findByPackageStaff(staffId);
	}

	@Override
	public String getDeliveryStaffName(String staffId) {
		return dor.findByDeliveryStaff(staffId);
	}

	@Override
	public List<MyOrderResponse> getByDeliveryNumberAndCustomer(String customerId) {
		List<Object[]> results = dor.findByDeliveryNumberAndCustomer(customerId);
		Map<String, MyOrderResponse> orderMap = new HashMap<>();
		
		
		for (Object[] result : results) {
			String deliveryNumber = (String) result[1]; // 獲取 deliveryNumber
			
			 // 如果 orderMap 中沒有該 deliveryNumber，則初始化 OrderResponse
		    if (!orderMap.containsKey(deliveryNumber)) {
		    	MyOrderResponse orderResponse = new MyOrderResponse();
		        orderResponse.setCustomerId((String) result[0]);// 第1欄 customerId
		        orderResponse.setDeliveryNumber(deliveryNumber);// 第2欄 deliveryNumber
		        Timestamp createDateTimestamp = (Timestamp) result[2];
		        orderResponse.setCreateDate(createDateTimestamp.toLocalDateTime());// 將第3欄 result[2] 轉換為 LocalDateTime
		        orderResponse.setStatus((String) result[3]); // 第4欄 status
		        orderResponse.setAttName((String) result[4]);// 第5欄 attName
		        orderResponse.setDeliveryAddress((String) result[5]); // 第6欄 deliveryAddress
		        orderResponse.setDeliveryInstrictions((String) result[6]);// 第7欄 deliveryInstructions
		        orderResponse.setTotalAmount((Integer) result[7]);// 第8欄 totalAmount
		        orderResponse.setPaintings(new ArrayList<>()); // 初始化畫作列表

		        orderMap.put(deliveryNumber, orderResponse);
		    }

		    // 添加畫作詳情到該訂單的畫作列表中
		    SimplePaintingDTO paintingDetails = new SimplePaintingDTO();
		    paintingDetails.setPaintingId((String) result[8]); // 第9欄 paintingId
		    paintingDetails.setPaintingName((String) result[9]); // 第10欄 paintingName
		    paintingDetails.setArtistName((String) result[10]); // 第11欄 artistName
		    paintingDetails.setImage((byte[]) result[11]); // 第12欄 artistName

		    // 將畫作詳細資訊添加到對應的訂單中
		    orderMap.get(deliveryNumber).getPaintings().add(paintingDetails);
		    
		}
		// 將所有訂單放入列表中返回
		List<MyOrderResponse> orderResponseList = new ArrayList<>(orderMap.values());
		return orderResponseList;
	}
	
	
}
