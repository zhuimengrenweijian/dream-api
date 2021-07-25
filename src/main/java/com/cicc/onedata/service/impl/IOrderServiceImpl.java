package com.cicc.onedata.service.impl;

import com.cicc.onedata.bean.Order;
import com.cicc.onedata.mybatisdao.OrderMapper;
import com.cicc.onedata.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IOrderServiceImpl implements IOrderService {

    @Autowired
    OrderMapper orderMapper;

    @Override
    public List<Order> findAll() {
        System.out.println("IOrderServiceImpl.findAll");
        System.out.println("orderMapper:" + orderMapper);
        return orderMapper.findAll();
    }

    @Override
    public Order findOne(Integer id) {
        return orderMapper.findOne(id);
    }
}
