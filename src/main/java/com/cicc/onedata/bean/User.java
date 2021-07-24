package com.cicc.onedata.bean;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data  //自动生成get set方法
@Entity  //自动生成相应的表，表名默认与实体类名相同   (JPA)
@Table(name = "user")
public class User {

    @Id  //设置主键
    @GeneratedValue(strategy = GenerationType.IDENTITY) //自动增长
    private Integer id;

    // @Column 指定在表中的名字，默认与属性名相同
    private String name;
    private String password;
    private Integer age;
    private String phone;

}
