import React, { useContext, useState } from "react";
import axios from "axios";
import "./profile.css";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";


const baseUrl="http://localhost:5000"


export default function Profile() {
    
  const {currentUser, setCurrentUser}=useContext(UserContext);
  const navigate= useNavigate();


  const [firstname, setFirstname]=useState(currentUser.Firstname);
  const [lastname, setLastname]=useState(currentUser.Lastname);
  const [adress, setAdress]=useState(currentUser.Adress);
  const [city, setCity]=useState(currentUser.City);
  const [country, setCountry]=useState(currentUser.Country);
  const [phonenumber, setPhonenumber]=useState(currentUser.Phonenumber);
  const [email, setEmail]=useState(currentUser.Email);
  const [password, setPassword]=useState(currentUser.Password);
  
  const[usersList, setUsersList]=useState([]);

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

  const handleSubmit = async (e) =>{

    e.preventDefault();

    if(emptyCheck() === true) return;
    if(letterCheck() === true) return;

    currentUser.Firstname = firstname;
    currentUser.Lastname = lastname;
    currentUser.Adress = adress;
    currentUser.City = city;
    currentUser.Country = country;
    currentUser.Phonenumber = phonenumber;

    try{
        const data=await axios.put(`${baseUrl}/users/${currentUser.id}`,{firstname, lastname, adress, city, country, phonenumber, email, password});
        setUsersList([...usersList, data.data]);
        alert("Uspesno izmenjen profil!");
      
      
    }catch(err){
      console.error(err.message);
    }
    
  }

  const handleDelete = async (id) => {
    try{
        await axios.delete(`${baseUrl}/users/${id}`);
        setCurrentUser(null);
        navigate("/");
      
      
     

    } catch(err){
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
  

  return(
    
    <div>
      <center>
        <section>        
        <form onSubmit={handleSubmit}>
        <h2 align="center">Profile</h2>
        <div><table className="table">
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
  </table></div>
            <br />
            
            <button type="submit" className="btn-edit">Edit profile</button>
            <button onClick={() => handleDelete(currentUser.id)} className="btn-delete">Delete profile</button>
            <pre><table className="table">
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
        <th>Adress</th>
        <th>City</th>
        <th>Country</th>
        <th>Phonenumber</th>
        <th>Created At</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{currentUser.Firstname}</td>
        <td>{currentUser.Lastname}</td>
        <td>{currentUser.Email}</td>
        <td>{currentUser.Adress}</td>
        <td>{currentUser.City}</td>
        <td>{currentUser.Country}</td>
        <td>{currentUser.Phonenumber}</td>
        <td>{currentUser.created_at}</td>
      </tr>
    </tbody>
  </table></pre>
          </form>
          </section>
        </center>
        </div>
    )
}