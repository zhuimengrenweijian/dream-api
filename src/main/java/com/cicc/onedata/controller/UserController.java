package com.cicc.onedata.controller;

import com.cicc.onedata.bean.User;
import com.cicc.onedata.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    IUserService userService;

    @RequestMapping(value = "add" , method = RequestMethod.GET)
    public String add(){

        User user = new User();
        user.setName("zwj");
        user.setAddress("asadsdsds");
        user.setEmail("aaddsdsd@12.dds");
        user.setMobile("134567");
        user.setRole(2);

        userService.saveUser(user);

        return "success";
    }

    @RequestMapping(value = "/getusers" , method = RequestMethod.GET)
    public List<User> findAllUsers(){
        return userService.findAll();
    }

    @RequestMapping(value = "/findbyid",method = RequestMethod.GET)
    public User findById(Integer id){
        return userService.getUserById(id);
    }


}
