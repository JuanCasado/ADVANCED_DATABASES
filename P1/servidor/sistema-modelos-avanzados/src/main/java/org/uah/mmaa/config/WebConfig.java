package org.uah.mmaa.config;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.GsonHttpMessageConverter;
import org.springframework.http.converter.xml.SourceHttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.uah.mmaa.core.utils.UahUtils;

import com.google.gson.Gson;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "org.uah.mmaa")
public class WebConfig implements WebMvcConfigurer
{
    @Bean
    public Gson gson()
    {
        return UahUtils.crearUahGsonBuilder().create();
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters)
    {
        StringHttpMessageConverter stringConverter = new StringHttpMessageConverter();
        stringConverter.setWriteAcceptCharset(false);
        stringConverter.setSupportedMediaTypes(Collections.singletonList(MediaType.TEXT_PLAIN));

        GsonHttpMessageConverter gsonHttpMessageConverter = new GsonHttpMessageConverter();
        gsonHttpMessageConverter.setGson(gson());
        gsonHttpMessageConverter.setSupportedMediaTypes(Arrays.asList(MediaType.APPLICATION_JSON));

        converters.add(new ByteArrayHttpMessageConverter());
        converters.add(new SourceHttpMessageConverter<>());
        converters.add(stringConverter);
        converters.add(gsonHttpMessageConverter);
    }
}
