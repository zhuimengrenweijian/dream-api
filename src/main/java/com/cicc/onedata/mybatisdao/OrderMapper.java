package com.cicc.onedata.mybatisdao;

import com.cicc.onedata.bean.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.List;

@Qualifier("mybatisSqlSessionFactory")
@Mapper
@Component
public interface OrderMapper {

    @Select("select * from tb_order")
    @Results(id="orderMap",value={
            @Result(id = true,column = "record_id",property = "recordId"),
            @Result(column = "record_time",property = "recordTime"),
            @Result(column = "record_num",property = "recordNum"),
            @Result(column = "record_img",property = "recordImg"),
            @Result(column = "record_season",property = "recordSeason"),
            @Result(column = "record_scene",property = "recordScene")})
    List<Order> findAll();

    @Select("select * from tb_order where record_id = #{recordId}")
    Order findOne(@Param("record_id") Integer recordId);


}
