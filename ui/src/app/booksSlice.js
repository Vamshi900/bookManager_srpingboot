import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchAllBooks,addBook,updateBookByIsbn,deleteBookByIsbn,fetchGoogleBooks,fetchBookByIsbn } from './api';


// intial state while starting up
const initialState = {
  books: [], // books arr used for datatable
  searchGoogle:false, // for isbn lookup
  status: 'idle' // status of app calls
};


// async logic using Thunks for making api calls

// get all books
export const fetchBooksAsync = createAsyncThunk(
  'books/fetchAllBooks',
  async () => {
    const response = await fetchAllBooks();
    return response;
  }
);


// add new book to db
export const addBooksAsync = createAsyncThunk(
  'books/addBooksAsync',
  async (book) => {
    const response = await addBook(book);
    if(response !==null){
      return book;
    }
    return null
  }
);

// update existing book data
export const updateBooksAsync = createAsyncThunk(
  'books/updateBooksAsync',
  async (book) => {
    const response = await updateBookByIsbn(book);
    if(response !== null){
      return book
    }
    return null;
  }
);

// delete book from db 
export const deleteBooksAsync = createAsyncThunk(
  'books/deleteBooksAsync',
  async (book) => {
    const response = await deleteBookByIsbn(book.isbn);
 
    // The value we return becomes the `fulfilled` action payload
    if(response !==null){
      return book.isbn;

    }
    return null
  }
);

//lookup for abook based on isbn
export const findBookIsbnAsync = createAsyncThunk(
  'books/findBookIsbnAsync',
  async (isbn) => {
    const response = await fetchBookByIsbn(isbn);
    console.log(response)
    // The value we return becomes the `fulfilled` action payload
    if(response !==null){
      return response;
    }
    return null
  }
);



export const booksSlice = createSlice({
  name: 'books',
  initialState,
  // reducers and  associated actions
  reducers: {
    // toggle searchstate action
    toggleSearch: (state, action) => {
      state.searchGoogle = !state.searchGoogle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooksAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.books = action.payload;
      })
      .addCase(addBooksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBooksAsync.fulfilled, (state, action) => {
        if(action.payload!==null){
         let bookstoUpdate = state.books.map(a => ({...a}));
          bookstoUpdate.push(action.payload)
          state.books = bookstoUpdate;
        }
      })
      .addCase(deleteBooksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBooksAsync.fulfilled, (state, action) => {
        if(action.payload!==null){
          let bookstoUpdate = state.books.map(a => ({...a}));
          bookstoUpdate=bookstoUpdate.filter(book => action.payload!==book.isbn);
          state.books = bookstoUpdate;
        }
      }) 
      .addCase(findBookIsbnAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(findBookIsbnAsync.fulfilled, (state, action) => {
        if(action.payload && action.payload.data[0]!==null){
          state.books=action.payload.data
          if(action.payload.search==='google'){
            state.searchGoogle=true
          }else{
            state.searchGoogle=false
          }
        }else{
          state.books=[]
        }
      })
      .addCase(updateBooksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBooksAsync.fulfilled, (state, action) => {
        if(action.payload){
          let bookstoUpdate = state.books.map(a => ({...a}));
          let index = bookstoUpdate.findIndex(x=>x.isbn===action.payload.isbn)
          bookstoUpdate.[index]=action.payload
          state.books = bookstoUpdate;
        }else{
          state.books=[]
        }
      })

  },
});

export const {toggleSearch } = booksSlice.actions;

//selectors
export const selectAllBooks = (state) => state.books.books;
export const selectGoogleBook = (state) => state.books.googleBook;
export const searchGooogleIsbn = (state) => state.books.searchGoogle;

export default booksSlice.reducer;
