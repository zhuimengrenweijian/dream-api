package com.cicc.onedata.bean;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Data
public class Order {

    @Id  //设置主键
    @Column(name = "record_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY) //自动增长
    Integer recordId;

    @Column(name = "record_time")
    Timestamp recordTime;

    @Column(name = "record_num")
    String recordNum;

    @Column(name = "record_img")
    String recordImg;

    @Column(name = "record_season")
    String recordSeason;

    @Column(name = "record_scene")
    String recordScene;


}
