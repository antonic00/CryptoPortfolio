import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./register.css";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const baseUrl="http://localhost:5000"

export default function Register() {
  
  const navigate = useNavigate();

  const [firstname, setFirstname]=useState("");
  const [lastname, setLastname]=useState("");
  const [adress, setAdress]=useState("");
  const [city, setCity]=useState("");
  const [country, setCountry]=useState("");
  const [phonenumber, setPhonenumber]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  
  const[usersList, setUsersList]=useState([]);
  
  const fetchUsers=async()=>{
    const data=await axios.get(`${baseUrl}/users`)
    const {Users}=data.data
    setUsersList(Users);
    console.log("DATA: ", Users)
   
  }


  function emptyCheck(){
    if(firstname === "" || lastname === "" || adress === "" || city === "" || country === "" || phonenumber === "" || email === "" || password === ""){
      alert("All fileds must be filled !");
      return true;
    } 
  }
    
   function letterCheck(){
    var letters = /^[A-Za-z]+$/;
    var addressValidation = /^(?:[0-9]+[a-z\s]|[a-z\s]+[0-9])[a-z0-9\s]*$/i;
    var lettersAndSpace = /^[A-Za-z\s]+$/;
    var phoneValidation = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s/0-9]*$/g;
    var pwValidation = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if(!letters.test(firstname) || !letters.test(lastname) || !addressValidation.test(adress) || !lettersAndSpace.test(city) || !phoneValidation.test(phonenumber) || pwValidation.test(password)){
      alert("Not all fields are filled properly,please check again");
      return true;
      
    }
  }

  var result = usersList.filter(user => {
    return user.Email === email;
    });

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(emptyCheck() === true) return;
    if(letterCheck() === true) return;
    if(result.length === 0) {
      console.log("Email is free!");
    }else {
        alert("Mail is taken !");
        return;
    }

    try{
      const data=await axios.post(`${baseUrl}/users`,{firstname, lastname, adress, city, country, phonenumber, email, password})
      setUsersList([...usersList, data.data]);
      // redirect
      navigate("/login");
      
    }catch(err){
      console.error(err.message);
    }
    
  }
  
  


  const handleChange1= e =>{
    setFirstname(e.target.value);
  }
  const handleChange2= e =>{
    setLastname(e.target.value);
  }
  const handleChange3= e =>{
    setAdress(e.target.value);
  }
  const handleChange4= e =>{
    setCity(e.target.value);
  }
  const handleChange5= e =>{
    setCountry(e.target.value);
  }
  const handleChange6= e =>{
    setPhonenumber(e.target.value);
  }
  const handleChange7= e =>{
    setEmail(e.target.value);
  }
  const handleChange8= e =>{
    setPassword(e.target.value);
  }
  
useEffect(()=>{
  fetchUsers();
},[])

  return(
    <div>
      <center>
        <section>        
        <form onSubmit={handleSubmit}>
        <h2 align="center">Sign Up</h2>
        <div className="form-group">
        <table className="table">
    <tbody>
      <tr>
        <td>First Name:</td>
        <td>
          <input
            onChange={handleChange1}
            type="text"
            className="form-control"
            id="firstname"
            name="firstname"
            placeholder="Enter first name"
            value={firstname}
          />
        </td>
      </tr>
      <tr>
        <td>Last Name:</td>
        <td>
          <input
            onChange={handleChange2}
            type="text"
            className="form-control"
            id="lastname"
            name="lastname"
            placeholder="Enter last name"
            value={lastname}
          />
        </td>
      </tr>
      <tr>
        <td>Address:</td>
        <td>
          <input
            onChange={handleChange3}
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="Enter address"
            value={adress}
          />
        </td>
      </tr>
      <tr>
        <td>City:</td>
        <td>
          <input
            onChange={handleChange4}
            type="text"
            className="form-control"
            id="city"
            name="city"
            placeholder="Enter city"
            value={city}
          />
        </td>
      </tr>
      <tr>
        <td>Country:</td>
        <td>
          <input
            onChange={handleChange5}
            type="text"
            className="form-control"
            id="country"
            name="country"
            placeholder="Enter country"
            value={country}
          />
        </td>
      </tr>
      <tr>
        <td>Phone Number:</td>
        <td>
          <input
            onChange={handleChange6}
            type="text"
            className="form-control"
            id="phonenumber"
            name="phonenumber"
            placeholder="Enter phone number"
            value={phonenumber}
          />
        </td>
      </tr>
      <tr>
        <td>Email:</td>
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

            </div>
            <br />
            <button type="submit" className="btn-register">Sign up</button>
          </form>
          </section>
        </center>
        </div>
    )
}