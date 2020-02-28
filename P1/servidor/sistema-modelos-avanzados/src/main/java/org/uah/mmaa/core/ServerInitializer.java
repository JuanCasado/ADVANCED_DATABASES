package org.uah.mmaa.core;

import java.io.File;

import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletRegistration;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
import org.uah.mmaa.config.WebConfig;
import org.uah.mmaa.config.mybatis.MyBatisConfig;
import org.uah.mmaa.config.security.WebSecurityConfig;


public class ServerInitializer extends AbstractAnnotationConfigDispatcherServletInitializer
{
    @Override
    protected Class<?>[] getRootConfigClasses()
    {
        return new Class[] { WebConfig.class, MyBatisConfig.class, WebSecurityConfig.class };
    }

    @Override
    protected Class<?>[] getServletConfigClasses()
    {
        return new Class[] {};
    }

    @Override
    protected String[] getServletMappings()
    {
        return new String[] { "/" };
    }

    @Override
    protected void customizeRegistration(ServletRegistration.Dynamic registration)
    {
        registration.setInitParameter("throwExceptionIfNoHandlerFound", "true");

        // upload temp file will put here
        File uploadDirectory = new File(System.getProperty("java.io.tmpdir"));

        int maxUploadSizeInMb = 20 * 1024 * 1024; // 5 MB

        // register a MultipartConfigElement
        MultipartConfigElement multipartConfigElement = new MultipartConfigElement(uploadDirectory.getAbsolutePath(), maxUploadSizeInMb, maxUploadSizeInMb * 2, maxUploadSizeInMb / 2);

        registration.setMultipartConfig(multipartConfigElement);
    }
}
