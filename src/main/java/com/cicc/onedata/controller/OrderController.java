package com.cicc.onedata.controller;

import com.cicc.onedata.common.CommonResponse;
import com.cicc.onedata.service.IOrderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags = "订单处理")
public class OrderController {

    @Autowired
    IOrderService orderService;

    @ApiOperation("查询所有订单信息")
    @GetMapping("/allorders")
    public CommonResponse findAll(){
        CommonResponse response = new CommonResponse();
        response.setData(orderService.findAll());
        response.setCode("200");
        response.setMessage("success");
        return response;
    }

    @ApiOperation("通过id查询订单信息")
    @GetMapping("/findorderbyid")
    public CommonResponse findOne(Integer id){
        CommonResponse response = new CommonResponse();
        response.setData(orderService.findOne(id));
        response.setCode("200");
        response.setMessage("success");
        return response;
    }

}
