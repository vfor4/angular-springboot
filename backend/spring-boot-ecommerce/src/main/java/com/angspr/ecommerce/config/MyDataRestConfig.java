package com.angspr.ecommerce.config;

import com.angspr.ecommerce.entities.Country;
import com.angspr.ecommerce.entities.Product;
import com.angspr.ecommerce.entities.ProductCategory;
import com.angspr.ecommerce.entities.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] theUnsupportActions = {HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PUT};

        disableHttpMethod(Product.class, config, theUnsupportActions);

        disableHttpMethod(ProductCategory.class, config, theUnsupportActions);

        disableHttpMethod(Country.class, config, theUnsupportActions);

        disableHttpMethod(State.class, config, theUnsupportActions);

        // call an internal helper method
        exposeIds(config);
    }

    private void disableHttpMethod(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metadata, httpMethods)-> httpMethods.disable(theUnsupportActions))
                .withCollectionExposure(((metadata, httpMethods) -> httpMethods.disable(theUnsupportActions)));
    }

    private void exposeIds(RepositoryRestConfiguration config) {

        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        List<Class> entityClasses = new ArrayList<>();

        for (EntityType entityType: entities
             ) {
            entityClasses.add(entityType.getJavaType());
        }

        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }

}
