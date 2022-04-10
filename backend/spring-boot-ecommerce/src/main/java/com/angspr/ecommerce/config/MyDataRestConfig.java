package com.angspr.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] theUnsupportActions = {HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PUT};

        config.getExposureConfiguration()
                .withItemExposure((metadata, httpMethods)-> httpMethods.disable(theUnsupportActions))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportActions)));
//        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
    }

}
