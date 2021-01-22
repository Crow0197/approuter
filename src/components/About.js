import React from 'react'
import axios from 'axios'

export default function About() {

  function postGet() {
   
    const header = new Headers();
    

    const body = {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false
    }

    var dsds = {
      headers: {
        'lucaaaaaa': 'abc123abc123',
        'Content-Type': 'application/json'
    }
    }
    axios.post("https://jsonplaceholder.typicode.com/posts", body, dsds)
      .then((res) => {
        this.setState({
          result: res
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message
        });
      })


  }


  return (

    <div className="App">
      <h1>About</h1>


      <button onClick={() => postGet()} >dsdsd</button>
    </div>
  )
}