package com.cicc.onedata.service;

import com.cicc.onedata.bean.User;

import java.util.List;

public interface IUserService {

    void saveUser(User user);

    List<User> findAll();

    User getUserById(Integer id);

    List<User> findByName(String name);

}
