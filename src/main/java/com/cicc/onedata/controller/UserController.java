package com.cicc.onedata.controller;

import com.cicc.onedata.bean.User;
import com.cicc.onedata.common.CommonResponse;
import com.cicc.onedata.service.IUserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Api(tags = "用户接口")
public class UserController {

    @Autowired
    IUserService userService;

    @ApiOperation("添加用户")
    @GetMapping(value = "/add")
    public CommonResponse add(){

        User user = new User();
        user.setName("zwj");
        user.setAddress("asadsdsds");
        user.setEmail("aaddsdsd@12.dds");
        user.setMobile("134567");
        user.setRole(2);

        userService.saveUser(user);

        return new CommonResponse("200",null,"success");
    }

    @ApiOperation("查询所有用户")
    @GetMapping(value = "/getusers")
    public CommonResponse findAllUsers(){
        return new CommonResponse("200",userService.findAll(),"success");
    }

    @ApiOperation("通过id查询用户信息")
    @GetMapping(value = "/findbyid")
    public CommonResponse findById(Integer id){
        return new CommonResponse("200",userService.getUserById(id),"success");
    }


}
