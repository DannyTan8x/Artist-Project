package com.artist.dto.request;

import java.util.List;

import com.artist.dto.response.OrdersDTO;

public class DeliveryOrderRequestDTO {

    private String attName; 
    private String attPhone; 
    private String deliveryAddress; 
    private String deliveryInstrictions; 
    private List<OrdersDTO> orderList;
    private Integer deliveryFee;
    private Integer totalAmount;

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

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getDeliveryInstrictions() {
        return deliveryInstrictions;
    }

    public void setDeliveryInstrictions(String deliveryInstrictions) {
        this.deliveryInstrictions = deliveryInstrictions;
    }

    public List<OrdersDTO> getOrderList() {
        return orderList;
    }

    public void setOrderList(List<OrdersDTO> orderList) {
        this.orderList = orderList;
    }

    public Integer getDeliveryFee() {
        return deliveryFee;
    }

    public void setDeliveryFee(Integer deliveryFee) {
        this.deliveryFee = deliveryFee;
    }

    public Integer getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Integer totalAmount) {
        this.totalAmount = totalAmount;
    }
}