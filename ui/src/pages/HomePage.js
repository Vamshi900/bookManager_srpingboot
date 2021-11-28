import React,{useEffect} from "react";
import DataTable from "../components/DataTable/DataTable";
import SearchBar from "../components/SearchBar/SearchBar";
import AddBook from "../components/AddBook/AddBook";
import { columns } from "../constants";

import { useSelector, useDispatch } from 'react-redux';
import { selectAllBooks,fetchBooksAsync,deleteBooksAsync, addBooksAsync, findBookIsbnAsync,searchGooogleIsbn,toggleSearch,updateBooksAsync       } from '../app/booksSlice';

function HomePage(props) {
  // global store selectors 
    const books = useSelector(selectAllBooks);
    const searchGoogle=useSelector(searchGooogleIsbn);

    // intialisting dispatch 
    const dispatch = useDispatch();

    // code to run on component mount
    useEffect(() => {
        dispatch(fetchBooksAsync())
      }, [])
   
    // delete book handler
    const deleteBook= (book)=>{
          dispatch(deleteBooksAsync(book))
    }  

    // adding a new book
    const addBook= (book)=>{
          dispatch(addBooksAsync(book))
    } 

    // add books found in google api
    const addGoogleBook= (book)=>{
      dispatch(addBooksAsync(book))
      dispatch(toggleSearch())
      dispatch(fetchBooksAsync())
}  

// update existing book 
    const updateBookHandler= (book)=>{
      dispatch(updateBooksAsync(book))
    }  
    
    // lookup for a book in the db and then fall back to goolge api 
    const searchHandler= (isbn)=>{
      if(isbn&&isbn.length===13){
        dispatch(findBookIsbnAsync(isbn))
      }
} 

      return <>

    <SearchBar  searchHandler={searchHandler}/>

    <AddBook addBook={addBook}/>
    <br/>
    <br/>
    <br/>
    <br/>
    <DataTable columns={columns} data={searchGoogle ?[]:books} deleteBook={deleteBook} updateBook={updateBookHandler}/>

    
    {searchGoogle? <>
    Found in Google
    <br/>
    <span>Title :</span> <span>{books[0].title}</span>
    <br/>
    <span>Author :</span> <span>{books[0].author}</span>
    <br/>
    <span>Pages :</span> <span>{books[0].pages}</span>
    <br/>
    <span>Satus :</span> <span>not read</span>
    <br/>
    <button onClick={()=>{addGoogleBook(books[0])}}>Add to your books</button>
    </> : <></>}
    </>
    
}

export default HomePage;