package com.artist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.artist.dto.request.DeliveryOrderRequestDTO;
import com.artist.dto.response.DeliveryOrderResponseDTO;
import com.artist.dto.response.DeliveryOrdersDTO;
import com.artist.entity.DeliveryOrders;
import com.artist.repository.DeliveryOrdersRepository;
import com.artist.service.impl.DeliveryOrdersServiceImpl;

@RestController
@RequestMapping("/DeliveryOrderController")
public class DeliveryOrdersController {

	@Autowired
	private DeliveryOrdersServiceImpl dosi;

	@Autowired
	private DeliveryOrdersRepository dor;

	@PostMapping(value = "/createDeliveryOrder", consumes = "application/json")
	public String createDeliveryOrder(@RequestBody DeliveryOrderRequestDTO deliveryOrderRequestDTO) {
		return dosi.createDeliveryOrder(deliveryOrderRequestDTO);
	}

	@GetMapping(value = "/selectall")
	public ResponseEntity<?> selectall() {
		List<DeliveryOrderResponseDTO> allDelivery = dosi.getAllWithOrders();
		return ResponseEntity.ok(allDelivery);
	}

	@GetMapping(value = "/selectbydeliveryNumber/{deliveryNumber}")
	public DeliveryOrderResponseDTO findByDeliveryNumber(@PathVariable("deliveryNumber") String deliveryNumber) {
		// System.out.println(deliveryNumber);
		DeliveryOrderResponseDTO delivery = dosi.getByOrderNumber(deliveryNumber);
		return delivery;
	}

	@GetMapping(value = "/selectbystatus")
	public ResponseEntity<?> selectByStatus(@RequestParam("status") String deliverystatus) {
		List<DeliveryOrderResponseDTO> delivery = dosi.getByStatusWithOrdersAndDetails(deliverystatus);
		return ResponseEntity.ok(delivery);
	}

	@DeleteMapping("/{deliveryNumber}")
	public ResponseEntity<Void> deleteDeliveryOrdersByNumber(@PathVariable String deliveryNumber) {
		dor.deleteById(deliveryNumber);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	@PutMapping(value = "/editDeliveryOrders", consumes = "application/json")
	public ResponseEntity<?> updateDeliveryOrders(@RequestBody DeliveryOrdersDTO deliveryOrdersfDTO) {
		dosi.update(deliveryOrdersfDTO);
		return ResponseEntity.status(HttpStatus.OK).body("修改成功");
	}

	@PostMapping(value = "/createDeliveryOrders", consumes = "application/json")
	public ResponseEntity<?> createDeliveryOrders(@RequestBody DeliveryOrderRequestDTO deliveryOrdersfDTO) {
		try {
			dosi.createDeliveryOrder(deliveryOrdersfDTO);
			return ResponseEntity.status(HttpStatus.CREATED).body("新增成功");
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
	}

	@RequestMapping(value = "/selectByDeliveryNumber/{deliveryNumber}", method = RequestMethod.GET)
	public DeliveryOrders selectByDeliveryNumber(@PathVariable("deliveryNumber") String deliveryNumber, Model model) {
		return dor.findByDeliveryNumberWithOrdersAndDetails(deliveryNumber).get();
	}

	@RequestMapping(value = "/selectByStatus/{status}", method = RequestMethod.GET)
	public List<DeliveryOrderResponseDTO> selectListByStatus(@PathVariable("status") String status, Model model) {
		// status="待處理";
		return dosi.getByStatusWithOrdersAndDetails(status);
	}

	@RequestMapping(value = "/selectByDeliveryStaff/{staffId}", method = RequestMethod.GET)
	public String selectListByDeliveryStaff(@PathVariable("staffId") String staffId, Model model) {
		return dosi.getDeliveryStaffName(staffId);
	}

	@RequestMapping(value = "/selectByPackageStaff/{staffId}", method = RequestMethod.GET)
	public String selectListByPackageStaff(@PathVariable("staffId") String staffId, Model model) {
		return dosi.getPackageStaffName(staffId);
	}

}
