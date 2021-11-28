import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import './searchBar.css'
import validateIsbn from '../../utils';


const { Search } = Input;


const SearchBar =(props)=>{
    const {searchHandler}=props;
    const [err,setErr]=useState(false);
    const [isbn,setIsbn] = useState('');

    const changeHandler=(value)=>{
        if(value.length>13){
               value = value.substring(0,13)
               setIsbn(value)
        }else if(value.length<13){
            setErr(true)
            if(value===''){
                 setErr(false)
            }
            setIsbn(value)
        }else if(value.length===13){
            setErr(true)
            if(validateIsbn(value)){
                setErr(false)
          } 
          setIsbn(value)
          
        }
    }
    const search =(isbn)=>{
        if(validateIsbn(isbn)){
            searchHandler(isbn)
        }
    }
    return(
        <>
        <Search value={isbn}  className='searchBar' allowClear  placeholder="Search for a book using ISBN.." loading={false} enterButton onPressEnter={(e)=>searchHandler(e.target.value)} onSearch={(val)=>search(val)} onChange={(e)=>changeHandler(e.target.value)}/>

        { (err) ? <span> 'Please enter a valid expression'</span>:<></> }
        </>
    );
}

export default SearchBar;