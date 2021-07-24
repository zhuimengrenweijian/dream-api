package com.cicc.onedata.mybatisdao;

import com.cicc.onedata.bean.Product;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.List;

//@Qualifier("mybatisSqlSessionFactory")
//@Mapper
//@Component
public interface ProductMapper {

    /**
     * 添加一个商品
     *
     * @param name
     * @param price
     */
/*
    @Insert("insert into product(productName, productPrice) values(#{name}, #{price})")
    void addProduct(@Param("name") String name, @Param("price") Double price);
*/

    /**
     * 查询所有的商品
     *
     * @return
     */
/*
    @Select("select * from product")
    List<Product> findAll();
*/

    /**
     * 根据商品id查询商品信息
     * @param id
     */
/*
    @Select("select * from product where productId = #{id}")
    Product findOne(@Param("id") Integer id);
*/

    /**
     *更新商品信息
     * @param product
     */
/*
    @Update({"update product set productName = #{product.productName}, productPrice = #{product.productPrice} where productId = #{product.productId}"})
    void update(@Param("product") Product product);
*/

    /**
     * 根据商品id删除商品信息
     * @param id
     */
/*
    @Delete("delete from product where productId = #{id}")
    void delete(@Param("id") Integer id);
*/

}
