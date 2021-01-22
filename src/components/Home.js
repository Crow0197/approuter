import React, { useState, useEffect } from 'react'
import { Link,useHistory  } from 'react-router-dom'
import Modal from 'react-modal';
import FormNewPost from './FormNewPost'
import axios from 'axios'
import cors from 'cors'
import { Button } from "@material-ui/core";
import ApiList from './ApiList'
import { useCookies } from "react-cookie";
import config from "../Data.json";


const customStyles = {
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 




export default function Home() {

 
  const [cookies, setCookie, removeCookie] = useCookies(["api_token"]);
  let [responseData, setResponseData] = React.useState('')


  const userAPI= (url = 'https://localhost:44345/Registry/') =>{
  return {
      fetchAll:()=>axios.get(url),
      create: newRecord => axios.post(url, newRecord),
      update: (id, updateRecord)=>axios.put(url  + id, updateRecord),
      delete: id => axios.delete(url + id)
  }
}



  useEffect(() => {
    fetchDada();


    ApiList.getData(cookies.api_token)
        .then((response)=>{
            setResponseData(response.data)
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })


        console.log(responseData);

        alert(config.get_url)
  }, [])


  

  const [posts, setPost] = useState([]);
  const [error, setErrors] = useState({})
  const [result, setResult] = useState({})
  const history = useHistory()


  const fetchDada = async () => {
   
    const rawData = await fetch('https://localhost:44345/api/Registry/');   
     
    console.log( userAPI().fetchAll())
    setPost(await rawData.json());
  }


  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.

  }

  function closeModal() {
    setIsOpen(false);
  }


  const addTodo = async (todo) => {
      
    var headerC = {
      headers: {
        'Token': 'abc123abc123',
        'Content-Type': 'application/json'
    }
    }

    
    const cors = require('cors')
    const querystring = require('querystring');  
    console.log(todo.Body);  
    await axios.post('https://localhost:44345/api/Registry',  querystring.stringify(todo), headerC);
      
    setIsOpen(false);

    await fetchDada();
    
  };


 




  return (

    <div className="App">
      <h1>Home: ciao {responseData.LastName}- Email : {responseData.Email}</h1>Email
      {posts.map(post => (
        <Link to={`/${post.id}`} style={{ color: 'black' }} key={post.id} >
          <div key={post.id}> <h4>{post.title}</h4></div>
        </Link>

      ))}

      <div>
        <Button onClick={openModal} className="btnCustom" variant="outlined" color="primary" style={customStyles}>Open Modal</Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          style={customStyles}
        >

          <FormNewPost submit={addTodo} />



        </Modal>

      </div>

    </div>
  )
}