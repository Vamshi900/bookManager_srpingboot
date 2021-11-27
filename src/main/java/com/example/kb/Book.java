package com.example.kb;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigInteger;

@Entity
@Table(name="books")
public class Book {

    @Id
    private String isbn;
    private String title;
    private String author;
    private String notes;
    private int pages;
    @Column(name = "status")
    private boolean status;

    //Empty constructor default
    public Book() {
    }

    // Override empty constructor
    public Book(String isbn, String title, String author, int pages, boolean status,String notes) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.notes = notes;
    }


    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
