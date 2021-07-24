package com.cicc.onedata.controller;

import com.cicc.onedata.bean.User;
import com.cicc.onedata.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class UserController {

    @Autowired
    IUserService userService;

    @RequestMapping("/allusers")
    public List<User> findAllUsers(){
        return userService.findAll();
    }

    @RequestMapping("/findbyid")
    public User findById(Integer id){
        return userService.getUserById(id);
    }


}
