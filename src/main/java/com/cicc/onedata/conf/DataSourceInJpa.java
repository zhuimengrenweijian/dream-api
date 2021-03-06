package com.cicc.onedata.conf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManager;
import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "entityManagerFactoryJpa",
        transactionManagerRef = "transactionManagerJpa",
        basePackages = {"com.cicc.onedata.jpadao"}) //设置Repository所在位置
public class DataSourceInJpa {

    @Bean(name = "jpaDataSource")
    @Qualifier("jpaDataSource")
    @Primary
    @ConfigurationProperties(prefix = "spring.datasource.jpa")
    public DataSource jpaDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Autowired
    @Qualifier("jpaDataSource")
    private DataSource jpaDataSource;

    @Primary
    @Bean(name = "entityManagerJpa")
    public EntityManager entityManager(EntityManagerFactoryBuilder builder) {
        return entityManagerFactoryJpa(builder).getObject().createEntityManager();
    }


    @Primary
    @Bean(name = "entityManagerFactoryJpa")
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryJpa(EntityManagerFactoryBuilder builder) {
        return builder
                .dataSource(jpaDataSource)
                .packages("com.cicc.onedata.bean") //设置实体类所在位置
                .persistenceUnit("jpaPersistenceUnit")
                .build();
    }

    @Primary
    @Bean(name = "transactionManagerJpa")
    public PlatformTransactionManager transactionManagerJpa(EntityManagerFactoryBuilder builder) {
        return new JpaTransactionManager(entityManagerFactoryJpa(builder).getObject());
    }

}
