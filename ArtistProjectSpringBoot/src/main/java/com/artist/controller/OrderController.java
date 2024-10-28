package com.artist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.artist.dto.response.OrdersDTO;
import com.artist.entity.Orders;
import com.artist.service.impl.OrdersServiceImpl;

@RestController
@RequestMapping("/OrderController")
public class OrderController {

	@Autowired
	private OrdersServiceImpl osi;

	@GetMapping(value = "/selectall")
	public ResponseEntity<?> findall() {
		List<Orders> alllist = osi.getAll();
		return ResponseEntity.ok(alllist);
	}

	@GetMapping(value = "/{ordernumber}")
	public ResponseEntity<?> getByOrdernumber(String ordernumber) {
		OrdersDTO o = osi.getOneByOrdernumber(ordernumber);
		return ResponseEntity.ok(o);
	}

	@PutMapping(value = "/editOrder", consumes = "application/json")
	public ResponseEntity<?> updateOrder(@RequestBody OrdersDTO ordersDTO) {
		osi.update(ordersDTO);
		return ResponseEntity.status(HttpStatus.OK).body("修改成功");
	}

	@DeleteMapping("/{orderId}")
	public ResponseEntity<Void> deleteOrderById(@PathVariable String orderId) {
		osi.delete(orderId);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

}
