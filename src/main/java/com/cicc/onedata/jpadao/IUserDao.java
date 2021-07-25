package com.cicc.onedata.jpadao;

import com.cicc.onedata.bean.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IUserDao extends JpaRepository<User,Integer> {

    List<User> findUserByName(String name);

}
