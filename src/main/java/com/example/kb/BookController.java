package com.example.kb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(maxAge = 3600)
@RestController
public class BookController {
    @Autowired
    private BookService bookService; //Creating the instance of the BookMethod here to use all the methods of the BookMethod.java


    @RequestMapping("/books")
    public List<Book> fetchAllBooks() {
        return this.bookService.getAllBooks();

    }

    @RequestMapping("/books/{isbn}")
    public Optional<Book> fetchBookByIsbn(@PathVariable String isbn) {
        return this.bookService.getBookByIsbn(isbn);
    }


    @RequestMapping(method = RequestMethod.POST, value = "/books")
    public String addBook(@RequestBody Book book) {
        Book newBook = new Book(
                book.getIsbn(),
                book.getTitle(),
                book.getAuthor(),
                book.getPages(),
                book.isStatus(),
                book.getNotes()
        );
        this.bookService.addBook(newBook);

        return "Book added successfully"+newBook.getIsbn();
    }


    @RequestMapping(method = RequestMethod.PUT, value = "/books")
    public String updateBookByIsbn(@RequestBody Book book) {
        Book newBook = new Book(
                book.getIsbn(),
                book.getTitle(),
                book.getAuthor(),
                book.getPages(),
                book.isStatus(),
                book.getNotes()
        );
        this.bookService.updateBook(newBook);

        return "Book updated successfully"+newBook.getIsbn();
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.DELETE, value = "/books/{isbn}")
    public String deleteBook(@PathVariable String isbn) {
        this.bookService.deleteBookByIsbn(isbn);
        return"Book deleted Successfully"+isbn;

    }
}
