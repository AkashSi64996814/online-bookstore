package in.akashsingh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.akashsingh.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
