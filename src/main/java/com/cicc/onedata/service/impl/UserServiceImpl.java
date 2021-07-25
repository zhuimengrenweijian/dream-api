package com.cicc.onedata.service.impl;

import com.cicc.onedata.bean.User;
import com.cicc.onedata.jpadao.IUserDao;
import com.cicc.onedata.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    IUserDao iUserDao;

    @Override
    public void saveUser(User user) {
        iUserDao.save(user);
    }

    @Override
    public List<User> findAll() {
        return iUserDao.findAll();
    }

    @Override
    public User getUserById(Integer id) {
        return iUserDao.getOne(id);
    }

    @Override
    public List<User> findByName(String name) {
        return iUserDao.findUserByName(name);
    }
}
