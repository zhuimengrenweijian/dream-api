package com.cicc.onedata.controller;

import com.cicc.onedata.bean.Order;
import com.cicc.onedata.common.CommonResponse;
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
    public CommonResponse findAll(){
        CommonResponse response = new CommonResponse();
        response.setData(orderService.findAll());
        response.setCode("200");
        response.setMessage("success");
        return response;
    }

    @RequestMapping("/findorderbyid")
    public CommonResponse findOne(Integer id){
        CommonResponse response = new CommonResponse();
        response.setData(orderService.findOne(id));
        response.setCode("200");
        response.setMessage("success");
        return response;
    }

}
