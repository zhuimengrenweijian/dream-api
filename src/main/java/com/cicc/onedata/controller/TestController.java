package com.cicc.onedata.controller;

import com.alibaba.fastjson.JSON;
import com.cicc.onedata.common.CommonResponse;
import com.cicc.onedata.conf.DataSourceInMybatis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @RequestMapping("/test")
    public CommonResponse test(){
        return new CommonResponse("200",null,"success");
    }

}
