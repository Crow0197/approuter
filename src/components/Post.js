import React, { useState, useEffect, Component } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { TextField, InputAdornment, OutlinedInput, Box, Button } from "@material-ui/core";
import axios from 'axios'
import '../App.css';

export default function Post(props) {

  const history = useHistory()
  const [editMode, setEditMode] = useState(true);

  const [editPending, setEditPending] = useState([]);




  const { id, deleteF } = useParams()

  useEffect(() => {
    fetchDada()
  }, [])



  const deleteThisPost = async (id) => {
    await axios.delete('https://localhost:44345/api/Registry/' + id);

    history.push("/")

  }

  const [post, setPost] = useState([]);




  const fetchDada = async () => {

    const rawData = await fetch('https://localhost:44345/api/Registry/' + id);
    
    const data = await rawData.json();
    console.log(data);
    setPost(data);
    setEditPending(data);
  }


  const editModeFalse = () => {


    return (<>
      <img src={post.imageUrl} className="imagePostForm" />
      <div> <h1>{post.title}</h1>
        <Button onClick={() => deleteThisPost(post.id)} style={{ margin: "1em" }} className="btnCustom" value="Submit" variant="outlined" color="secondary" >DELETE</Button>
        <Button onClick={() => setEditMode(false)} style={{ margin: "1em" }} className="btnCustom" type="" value="Edit" variant="outlined" color="primary">Edit</Button>

      </div>
      <div>
        {post.body}
      </div>

    </>
    )


  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;






    if (name == "Title") {
      editPending["title"] = value;
    }

    if (name == "Body") {
      editPending["body"] = value;
    }
    if (name == "ImageUrl") {
      editPending["imageUrl"] = value;
    }


    setEditPending({ postId: post.id, id: post.id, title: editPending["title"], body: editPending["body"], imageUrl: editPending["imageUrl"] });


    console.log(editPending);

  }


  const pushEdit = async (Event) => {

    Event.preventDefault();
    const cors = require('cors')
    const querystring = require('querystring');

    await axios.put('https://localhost:44345/api/Registry/' + id, querystring.stringify(editPending)).then(res => {
      setEditMode(true);
      setPost(editPending);

    })
      .catch(err => console.log(err));



    console.log(editMode)
    // await fetchDada();

  };

  const reset = async (Event) => { 
  
    setEditPending(editPending);
    setEditMode(true);
  }


  const editModeTrue = () => {





    return (<>
      <form className="FormClass" onSubmit={pushEdit}>


        <img src={editPending.imageUrl} className="imagePostForm" />

        <div className="divForm">
          <TextField
            className="input"
            type="text"
            value={editPending.title}
            placeholder="aggiungi todo"
            onChange={handleInputChange}
            name="Title"

          />

        </div>
        <div className="divForm">
          <TextField
            multiline
            id="standard-basic"
            className="input"
            type="text"
            value={editPending.body}
            placeholder="aggiungi todo"
            onChange={handleInputChange}
            name="Body"

            multiline
            rows={5}
          />

        </div><div className="divForm">
          <TextField

            className="input"
            type="text"
            value={editPending.imageUrl}
            placeholder="aggiungi todo"
            onChange={handleInputChange}
            name="ImageUrl"

          />

        </div>


        <Button style={{ margin: "1em" }} className="btnCustom" type="submit" value="Submit" variant="outlined" color="primary" >Submit</Button>
        <Button style={{ margin: "1em" }} onClick={() => reset()} className="btnCustom" type="reset" value="Reset" variant="outlined" color="secondary">Torna indietro</Button>

      </form>

    </>
    )


  }

  return (


    <div className="App">

      { !editMode && editModeTrue()}
      { editMode && editModeFalse()}


    </div>
  )
}