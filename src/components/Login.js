import React from 'react'
import { useCookies } from "react-cookie";



export default function Login() {

  const [cookies, setCookie] = useCookies(["user"]);

  function handleCookie() {
    setCookie("user", "gowtham", {
      path: "/"
    });
  }

    return (
  
      <div className="App">
        <h1>Concats</h1>
        <button onClick={handleCookie}>Set Cookie</button>
         </div>
    )
  }