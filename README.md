# Scanbook App 
## Overview
 A full stack application using
- React (Front end )
- Api/Backend(Java Spring)
- Mysql 8.0( Database)
- Infrastructure (Docker & Docker-compose)

## Quick start

To quickly bring up the applicaiton follow the steps: 

- Make sure Docker is installed and running on your machine 
- check and make these ports available 3000,8084,3306
- Clone the repo `git clone https://github.com/Vamshi900/kb/`
- cd into the directory `kb`
- Run the command 
  ` docker-compose up` 

You can see the front end hoseted on `http://localhost:3000/`

! Hurray.That is all 

## Front end 
 
Front end was built using React(v17),Redux


A High Level Over view of Front end


<img width="766" alt="Front End Over view" src="https://user-images.githubusercontent.com/18380025/143774069-02926c9c-f9f7-4c9e-a901-a19765495d7c.png">


### Search Bar
- Search bar is used to lookup ISBN number (<b> supports only 13 digit numerics only </b>)
- Isbn is validated for the following - numeric, 13 digits long, starting with 9 and weighted sum checksum 
- Validation using `validateCheckSum` function in the utils 
- If it is valid then Search is performed 
- Supports Search using enter button Click

* First User Database is searched for the book isbn - if found it is displayed in the Data table
* If not Google books api is searched and Displayed ( Add to your books options allows to add it your book list )

 Note :: in authors returned only first author is picked , we can extend for multiple author's later

### DataTable
- The Data table was used to support huge set of books - even upto 100,000
- Pagination is availbale in the table which is enchable for loading books on demand as user scrolls pages 
- Each record has it's actions (Update,Delete)


### Add Book 

- Add book modal is used for adding a new book into the list 
- Supports Validation of required feilds ISBN(validated),Author,Title,Number of Pages
- On sucessful validation book is added to the database and then updated back in the ui

### Delete Book 
- Book is Deleted in the database and only if it is sucessful ui is updated

### Update Book 
- Book is updated in the database and if it is sucessful ui is updated


## API/Backend

- A Simple Rest api using Java Spring 
- Entity (isbn,title,author,pages,status(boolean)(read/notyet),notes)
- BookController (Exposes the Routes and handles requests)
- BookService(Bussiness Logic for end point)
- Bookinterface ( Curd operations interface)
- Book.java (Entity)

## Database 

- Mysql Db


## Infrastructure
 
 - Docker and Docker compose 




 
