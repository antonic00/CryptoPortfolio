import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./login.css";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const baseUrl="http://localhost:5000"

function Login(){

    const navigate= useNavigate();

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const {currentUser, setCurrentUser}=useContext(UserContext);
    const[usersList, setUsersList]=useState([]);

    const handleChange7= e =>{
        setEmail(e.target.value);
      }
    const handleChange8= e =>{
        setPassword(e.target.value);
      }

  const fetchUsers=async()=>{
    const data=await axios.get(`${baseUrl}/users`)
    const {Users}=data.data
    setUsersList(Users);
    console.log("DATA: ", data)
  }


  function emptyCheck(){
    if(email === "" || password === ""){
      alert("All fileds must be filled !");
      return true;
    } 
  }
    
  function matchCheck(){
    var res=0;
    usersList.forEach(user => {
      if(user.Email===email && user.Password===password){
        res++;
        setCurrentUser(user);
      }
    }
    );
    if(res===1) return true;
    else return false;
  }

  var result = usersList.filter(user => {
    return user.Email === email;
    });

  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    if(emptyCheck() === true) return;
    if(matchCheck()=== false) {
      if(result.length === 0) {
        alert("User with this email don't exist!");
        return;
      }else{
          alert("Password is incorrect!");
          return;
      }
    }

    try{
      
      console.log("Loged in!");
      navigate("/");
      

    }catch(err){
      console.error(err.message);
    }
    
  }

  useEffect(()=>{
    fetchUsers();
  },[])

    return(
        <section>
          <center>
            <div className="login">
            <form onSubmit={handleSubmit}>
                <h2 align="center">Login</h2>
                <table className="table">
    <tbody>
      <tr>
        <td>Email Address:</td>
        <td>
          <input
            onChange={handleChange7}
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            value={email}
          />
        </td>
      </tr>
      <tr>
        <td>Password:</td>
        <td>
          <input
            onChange={handleChange8}
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter password"
            value={password}
          />
        </td>
      </tr>
    </tbody>
  </table>

                    <br />
                    <button type="submit" className="btn-login">Login</button>
                </form>
            </div>
            </center>
            </section>
    )

}

export default Login;