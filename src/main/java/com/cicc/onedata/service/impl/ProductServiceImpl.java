package com.cicc.onedata.service.impl;

import com.cicc.onedata.bean.Product;
import com.cicc.onedata.service.IProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements IProductService {


    @Override
    public void saveProduct(Product product) {

    }

    @Override
    public List<Product> findAllProducts() {
        return null;
    }

    @Override
    public Product findOne(Integer id) {
        return null;
    }

    @Override
    public void update(Product product) {

    }

    @Override
    public void delete(Integer id) {

    }
}
