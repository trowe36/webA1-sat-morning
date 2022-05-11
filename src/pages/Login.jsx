import { getImageListItemBarUtilityClass } from "@mui/material";
import React from "react";
import {useState} from "react"

export default function Login() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const INCOMPLETE = "Request body incomplete, both email and password are required"
  const INCORRECT = "Incorrect email or password" 

  function fetchURL(){
    const url = 'http://sefdb02.qut.edu.au:3001/user/login'

    return fetch(url, {
      method: "POST",
      headers: {accept: "application/json", "Content-Type": "application/json"},
      body: JSON.stringify({email: name, password: password})
    })
    .then(res => res.json ())
    .then(res => {
      if(res.message == INCOMPLETE){
        console.log("PASSWORD OR EMAIL INCOMPLETE")
      }
      if(res.message == INCORRECT){
        console.log("PASSWORD OR EMAIL INCORRECT" + res.code)
      }
      if(res.token_type === "Bearer"){
        localStorage.setItem("token", res.token)
        console.log("successfully set token.")
      }
      
    })
  }

  function logout(){
    let token = localStorage.getItem("token")
    //console.log(volcano)
    if(token == undefined)
    {
      console.log("you are not logged in!")
    }
    else{
      console.log("Removing item from local storage" + localStorage.getItem("token"))
      localStorage.removeItem("token")
    }

 }
    return (
      <div>
        <h1>LOGIN</h1>
         <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label htmlFor="name">Username: </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => {
            const newName = event.target.value;
            //check for errors here then set name
            setName(newName);
          }}
        />
        <div>  <label htmlFor="pass">Password: </label>
        <input
          id="pass"
          name ="pass"
          type="text"
          value={password}
          onChange={(event) => {
            const newPassword = event.target.value;
            //check for errors here then set name
            setPassword(newPassword);
          }}
        />
        </div>
      
        <button onClick = {fetchURL} type="submit">Submit</button>
      </form>
      <button onClick={logout}>Logout</button>
      </div>
    );
  }