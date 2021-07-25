package com.cicc.onedata.controller;

import com.cicc.onedata.bean.Order;
import com.cicc.onedata.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    IOrderService orderService;

    @RequestMapping("/allorders")
    public List<Order> findAll(){
        System.out.println("OrderController.allorders");
        return orderService.findAll();
    }

    @RequestMapping("/findorderbyid")
    public Order findOne(Integer id){
        return orderService.findOne(id);
    }

}
