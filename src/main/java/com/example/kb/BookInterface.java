package com.example.kb;

import org.springframework.data.repository.CrudRepository;

public interface BookInterface extends CrudRepository<Book, String> {
}
