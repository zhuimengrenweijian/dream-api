package com.cicc.onedata.service;

import com.cicc.onedata.bean.Order;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IOrderService {

    List<Order> findAll();

    Order findOne(@Param("record_id") Integer id);

}
