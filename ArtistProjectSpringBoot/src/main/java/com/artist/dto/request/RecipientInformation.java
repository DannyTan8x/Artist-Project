package com.artist.dto.request;

public class RecipientInformation {
	
	private String ordernumber;
	
	private String attName;
	
	private String attPhone;

	private String deliveryAdress;
	
	private String deliveryInstrictions;

	public RecipientInformation() {
		super();
	}

	public RecipientInformation(String ordernumber, String attName, String attPhone, String deliveryAdress,
			String deliveryInstrictions) {
		super();
		this.ordernumber = ordernumber;
		this.attName = attName;
		this.attPhone = attPhone;
		this.deliveryAdress = deliveryAdress;
		this.deliveryInstrictions = deliveryInstrictions;
	}

	public String getOrdernumber() {
		return ordernumber;
	}

	public void setOrdernumber(String ordernumber) {
		this.ordernumber = ordernumber;
	}

	public String getAttName() {
		return attName;
	}

	public void setAttName(String attName) {
		this.attName = attName;
	}

	public String getAttPhone() {
		return attPhone;
	}

	public void setAttPhone(String attPhone) {
		this.attPhone = attPhone;
	}

	public String getDeliveryAdress() {
		return deliveryAdress;
	}

	public void setDeliveryAdress(String deliveryAdress) {
		this.deliveryAdress = deliveryAdress;
	}

	public String getDeliveryInstrictions() {
		return deliveryInstrictions;
	}

	public void setDeliveryInstrictions(String deliveryInstrictions) {
		this.deliveryInstrictions = deliveryInstrictions;
	}
	
	
}
