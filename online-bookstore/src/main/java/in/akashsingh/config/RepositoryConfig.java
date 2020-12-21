package in.akashsingh.config;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.Type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import in.akashsingh.entity.Book;
import in.akashsingh.entity.BookCategory; 

@Configuration
public class RepositoryConfig implements RepositoryRestConfigurer {

	@Autowired
	private EntityManager entityManager;
	
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
//		config.exposeIdsFor(Book.class);
//		config.exposeIdsFor(BookCategory.class);
		config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream()
				.map(Type::getJavaType)
				.toArray(Class[]::new));
		
		config.getCorsRegistry()
			   .addMapping("/**")
			   .allowedOrigins("http://localhost:4200");
	}
}
