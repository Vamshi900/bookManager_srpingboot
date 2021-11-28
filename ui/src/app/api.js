
import axios from 'axios';

const google_api ="https://www.googleapis.com/books/v1/volumes?q=isbn:"
const api_endpoint = "http://localhost:8084/books/"


//get calls 

async function fetchAllBooks() {
    try {
      const result = await axios.get(api_endpoint)
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }

//get  book  based on isbn
  async function fetchBookByIsbn(isbn) {
    try {
      if(isbn!==""){
        const result = await axios.get(api_endpoint+`${isbn}`);

        if(result.data!==null){
          return {search:'db',data:[result.data]};
        }else{
          // if not found fall back to google api
          const googleSearch = await fetchGoogleBooks(isbn);
          return {search:'google',data:[googleSearch]}
        }
     
      }
     return null
    } catch (error) {
      console.error(error);
    }
  }
  const parseGoolgeApiData =(data)=>{
    // considering to be only one author books
    if (data.totalItems===1){
      const goolgeBook= data.items[0]
      const newBook ={ }
      newBook.isbn = goolgeBook.volumeInfo.industryIdentifiers[1].identifier
      newBook.author = goolgeBook.volumeInfo.authors[0]
      newBook.title = goolgeBook.volumeInfo.title
      newBook.pages = goolgeBook.volumeInfo.pageCount
      newBook.status =0
      newBook.notes=''
      return newBook
    }
    return null
  }

//search google api
async function fetchGoogleBooks(isbn) {
    try {
      const result = await axios.get(google_api+`${isbn}`);
      return parseGoolgeApiData(result.data)
    } catch (error) {
      console.error(error);
      return null
    }
  }


//put call
  async function updateBookByIsbn(updatedBook) {
    try {
      const result = await axios.put(api_endpoint,updatedBook);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  } 

//post
async function addBook(newBook) {
    try {
      const result = await axios.post(api_endpoint,newBook);
      return result.data;
    } catch (error) {
      console.error(error);
      return null
    }
  }
  

//delete api call
async function deleteBookByIsbn(isbn) {
 const headers= {
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  }
    try {
      const result= await axios.delete(api_endpoint+`${isbn}`,{headers})
      return result;
    } catch (error) {
      console.error(error);
      return null
    }
  }  
 
export {fetchAllBooks, addBook,updateBookByIsbn,deleteBookByIsbn,fetchGoogleBooks,fetchBookByIsbn}  