package com.cicc.onedata.controller;

import com.cicc.onedata.common.CommonResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags = "测试接口")
public class TestController {

    @GetMapping("/test")
    @ApiOperation("测试服务器是否正常")
    public CommonResponse test(){
        return new CommonResponse("200",null,"success");
    }

}
