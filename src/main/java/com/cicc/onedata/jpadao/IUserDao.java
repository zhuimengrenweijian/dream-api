package com.cicc.onedata.jpadao;

import com.cicc.onedata.bean.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IUserDao extends JpaRepository<User,Integer> {

    /**
     * 查找是否有这样的用户名和密码用户存在
     *
     * @param name
     * @param password
     * @return
     */
    User findUserByNameAndPassword(String name, String password);


    /**
     * 查找是否有这样的用户存在
     *
     * @param name
     * @return
     */
    List<User> findUserByName(String name);

}
