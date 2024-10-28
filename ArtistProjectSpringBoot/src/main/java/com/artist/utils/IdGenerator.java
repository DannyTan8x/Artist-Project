package com.artist.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.artist.entity.Artist;
import com.artist.entity.Customers;
import com.artist.entity.DeliveryOrders;
import com.artist.entity.OrderDetails;
import com.artist.entity.Paintings;
import com.artist.repository.ArtistRepository;
import com.artist.repository.CustomersRepository;
import com.artist.repository.DeliveryOrdersRepository;
import com.artist.repository.OrderDetailsRepository;
import com.artist.repository.PaintingsRepository;

@Component
public class IdGenerator {
	static Integer numCodelenght = 4;
	@Autowired
	private CustomersRepository cr;
	@Autowired
	private PaintingsRepository ptr;
	@Autowired
	private ArtistRepository arr;
	@Autowired
	private OrderDetailsRepository odr;
	@Autowired
	private DeliveryOrdersRepository dor;

	public String DeliveryOrdersId() {
		String prefix = "DO";
		List<DeliveryOrders> deliveryOrdersList = dor.findAll();
		if (deliveryOrdersList.size() > 0) {
			DeliveryOrders lastesPaintings = deliveryOrdersList.get(deliveryOrdersList.size() - 1);
			String lastestId = lastesPaintings.getDeliveryNumber();
			return IDGenerator(prefix, lastestId);
		} else {
			return IDGenerator(prefix, "0000");
		}
	}

	public String artistId() {
		String prefix = "AR";
		List<Artist> artList = arr.findAll();
		if (artList.size() > 0) {
			Artist lastesArtist = artList.get(artList.size() - 1);
			String lastestId = lastesArtist.getArtistId();
			return IDGenerator(prefix, lastestId);
		} else {
			return IDGenerator(prefix, "0000");
		}
	}

	public String customersId() {
		String prefix = "CU";
		List<Customers> all = cr.findAll();
		if (all.size() > 0) {
			Customers lastesCustomers = all.get(all.size() - 1);
			String lastestId = lastesCustomers.getCustomerId();
			return IDGenerator(prefix, lastestId);
		} else {
			return IDGenerator(prefix, "0000");
		}

	}

	public String paintingId() {
		String prefix = "PT";
		List<Paintings> paintingsList = ptr.findAll();
		if (paintingsList.size() > 0) {
			Paintings lastesPaintings = paintingsList.get(paintingsList.size() - 1);
			String lastestId = lastesPaintings.getPaintingId();
			return IDGenerator(prefix, lastestId);
		} else {
			return IDGenerator(prefix, "0000");
		}
	}

	public static String IDGenerator(String prefix, String id) {
		Integer number = 0;
		String pre = prefix;
		try {
			String sub = id.substring(id.length() - numCodelenght, id.length());
			number = Integer.parseInt(sub) + 1;
		} catch (Exception e) {
			number = 1;
		}

		String newSub = "" + number + "";
		for (int i = 0; i < numCodelenght; i++) {
			if (newSub.length() < numCodelenght) {
				newSub = "0" + newSub;
			}
		}

		return pre + newSub;

	}

	public String orderId() {
		String prefix = "OR";
		List<OrderDetails> orderDetailsList = odr.findAll();

		if (orderDetailsList.size() > 0) {
			OrderDetails lastesOrders = orderDetailsList.get(orderDetailsList.size() - 1);
			String lastestId = lastesOrders.getOrderNumber();
			return IDGenerator(prefix, lastestId);
		} else {
			return IDGenerator(prefix, "0000");
		}
	}

	public static String IDGeneratorDO(String prefix, String id) {
		Integer number = 0;
		String pre = prefix;

		String currentDate = new SimpleDateFormat("yyyyMMdd").format(new Date());

		try {
			String lastDate = id.substring(2, 10);
			String sub = id.substring(id.length() - 4);

			if (!lastDate.equals(currentDate)) {
				number = 1;
			} else {
				number = Integer.parseInt(sub) + 1;
			}
		} catch (Exception e) {
			number = 1;
		}

		String newSub = String.format("%04d", number);

		return pre + currentDate + newSub;
	}

	public String deliveryOrderId() {
		String prefix = "DO";
		List<DeliveryOrders> deliveryOrderList = dor.findAll();

		if (!deliveryOrderList.isEmpty()) {
			DeliveryOrders lastestDeliveryOrder = deliveryOrderList.get(deliveryOrderList.size() - 1);
			String lastestId = lastestDeliveryOrder.getDeliveryNumber();

			return IDGeneratorDO(prefix, lastestId);
		} else {
			return IDGeneratorDO(prefix, "DO" + new SimpleDateFormat("yyyyMMdd").format(new Date()) + "0000");
		}
	}

}
