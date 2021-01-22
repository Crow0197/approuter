import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";



export default function Navbar() {

    const [cookies, setCookie, removeCookie] = useCookies(["api_token"]);


    const youAreAuthenticated = () => {

      

        if (cookies.api_token)
            return (<div className="Navbar">
                <h1>Logo</h1>
                <ul className="Links">
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/About">
                        <li>About</li>
                    </Link>
                    <a onClick={()=> removeCookie("api_token")}>
                        <li>Logout</li>
                    </a>

                </ul>
            </div>);
        else
            return (<div className="Navbar">
            <h1>Logo</h1>
            <ul className="Links">              
                <Link to="/Login">
                    <li>Login</li>
                </Link>

            </ul>
        </div>);
    }





    return (
        <div>{youAreAuthenticated()}</div>
    )
}