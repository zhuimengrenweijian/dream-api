package com.cicc.onedata.mybatisdao;

import com.cicc.onedata.bean.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.List;

@Qualifier("mybatisSqlSessionFactory")
@Mapper
@Component
public interface OrderMapper {

    @Select("select * from tb_order")
    List<Order> findAll();

    @Select("select * from tb_order where record_id = #{recordId}")
    Order findOne(@Param("record_id") Integer recordId);


}
