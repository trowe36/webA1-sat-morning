import React from "react";
import {useState} from "react"

export default function Register() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");

  function RegisterUser(){
    const url = 'http://sefdb02.qut.edu.au:3001/user/register'

    return fetch(url, {
      method: "POST",
      headers: {accept: "application/json", "Content-Type": "application/json"},
      body: JSON.stringify({email: name, password: password})
    })
    .then(res => res.json ())
    .then(res => {
      console.log(res)
    })
  }

  return (
    <div className="App">
      <h1>REGISTER</h1>
      {name !== "" ? <h1>Hi {name}</h1> : null}
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
      
        <button onClick = {RegisterUser} type="submit">Submit</button>
      </form>
    </div>
  );
  }