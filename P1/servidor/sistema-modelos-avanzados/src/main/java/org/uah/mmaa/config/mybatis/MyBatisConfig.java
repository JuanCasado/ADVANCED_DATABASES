package org.uah.mmaa.config.mybatis;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;

import javax.sql.DataSource;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.AutoMappingBehavior;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.LocalCacheScope;
import org.apache.ibatis.type.JdbcType;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.postgresql.Driver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@EnableTransactionManagement
@MapperScan(basePackages = "org.uah.mmaa.features", annotationClass = Mapper.class)
@PropertySource("classpath:mybatis/jdbc.properties")
public class MyBatisConfig
{
    @Value("${jdbc.databaseurl}")
    private String databaseurl;

    @Value("${jdbc.username}")
    private String username;

    @Value("${jdbc.password}")
    private String password;

    @Bean
    public DataSource dataSource()
    {
        SimpleDriverDataSource dataSource = new SimpleDriverDataSource();

        dataSource.setDriverClass(Driver.class);
        dataSource.setUrl(databaseurl);
        dataSource.setUsername(username);
        dataSource.setPassword(password);

        return dataSource;
    }

    @Bean
    public DataSourceTransactionManager transactionManager()
    {
        return new DataSourceTransactionManager(dataSource());
    }

    @Bean
    public SqlSessionFactoryBean sqlSessionFactory() throws IOException
    {
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(dataSource());
        sessionFactory.setTypeAliasesPackage("org.uah.mmaa.features");
        sessionFactory.setTypeHandlersPackage("org.uah.mmaa.config.mybatis.handler");
        sessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:mybatis/mappers/**/*.xml"));
        sessionFactory.setConfiguration(configuration());

        return sessionFactory;
    }

    @Bean
    public SqlSessionTemplate sqlSessionTemplate() throws Exception
    {
        return new SqlSessionTemplate(sqlSessionFactory().getObject(), ExecutorType.BATCH);
    }

    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer()
    {
        return new PropertySourcesPlaceholderConfigurer();
    }

    public org.apache.ibatis.session.Configuration configuration()
    {
        org.apache.ibatis.session.Configuration configuration = new org.apache.ibatis.session.Configuration();

        configuration.setLazyLoadingEnabled(false);
        configuration.setCacheEnabled(false);
        configuration.setMultipleResultSetsEnabled(true);
        configuration.setUseColumnLabel(true);
        configuration.setUseGeneratedKeys(false);
        configuration.setAutoMappingBehavior(AutoMappingBehavior.PARTIAL);
        configuration.setDefaultExecutorType(ExecutorType.SIMPLE);
        configuration.setSafeRowBoundsEnabled(false);
        configuration.setMapUnderscoreToCamelCase(false);
        configuration.setLocalCacheScope(LocalCacheScope.STATEMENT);
        configuration.setJdbcTypeForNull(JdbcType.OTHER);
        configuration.setLazyLoadTriggerMethods(new HashSet<String>(Arrays.asList("equals,clone,hashCode,toString")));

        return configuration;
    }
}
