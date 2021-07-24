package com.cicc.onedata.conf;


import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;

//@Configuration //注册到spring容器中
//@MapperScan(basePackages = {"com.cicc.onedata.mybatisdao","mapper"}, sqlSessionFactoryRef = "mybatisSqlSessionFactory")
public class DataSourceInMybatis {

    /**
     * 配置mybatis数据库
     *
     * @return
     */
/*
    @Bean(name = "mybatisDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.product")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }
*/

    /**
     * 创建SqlSessionFactory
     *
     * @param dataSource
     * @return
     * @throws Exception
     */
/*
    @Bean(name = "mybatisSqlSessionFactory")
    // @Primary  //primary是设置优先，因为有多个数据源，在没有明确指定用哪个的情况下，会用带有primary的，这个注解必须有一个数据源要添加
    public SqlSessionFactory sqlSessionFactory(@Qualifier("mybatisDataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        return bean.getObject();
    }
*/

    /**
     * 配置事务管理
     *
     * @param dataSource
     *
     * @return
     */
/*    @Bean("mybatisTransactionManager")
    public DataSourceTransactionManager transactionManager(@Qualifier("mybatisDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean("mybatisSqlSessionTemplate")
    public SqlSessionTemplate sqlSessionTemplate(@Qualifier("mybatisSqlSessionFactory") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }*/

}
