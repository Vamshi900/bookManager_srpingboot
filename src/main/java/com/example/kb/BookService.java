package com.example.kb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private BookInterface bookInter;

    // get api methods
    public List<Book> getAllBooks() {
        List<Book> books = new ArrayList<>();
        this.bookInter.findAll().forEach(books::add);
        return books;
    }

    public Optional<Book> getBookByIsbn(String isbn) {
        return bookInter.findById(isbn);
    }

    //post method
    public String addBook(Book book) {
        // need to add validation
        this.bookInter.save(book);
        return "Added book successfully" + book.getIsbn();
    }

    //put method
    public String updateBook(Book book) {
        // need to add validation
        Book existingBook = bookInter.findById(book.getIsbn()).orElse(null);

        if(existingBook!=null){
            existingBook.setAuthor(book.getAuthor());
            existingBook.setPages(book.getPages());
            existingBook.setStatus(book.isStatus());
            existingBook.setNotes(book.getNotes());
            bookInter.save(existingBook);
            return"Book updated successfully"+existingBook.getIsbn();
        }

       return "No such book exist with isbn"+book.getIsbn();

    }


    //delete method
    public void deleteBookByIsbn(String isbn) {
        // add validation
        bookInter.deleteById(isbn);

    }


}
