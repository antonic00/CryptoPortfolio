import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./wallet.css";
import { UserContext } from "../UserContext";
import './Coins.css'

const baseUrl="http://localhost:5000"

export default function Wallet() {

    const {currentUser}=useContext(UserContext);
    const[coinsList, setCointsList]=useState([]);
    const[transList, setTransList]=useState([]);
    const [transType]=useState("Sold");
    const [ownerId]=useState(currentUser.id);
    const [coinAmount,setCoinAmount] = useState(0);



    const fetchCoins=async()=>{
        const data=await axios.get(`${baseUrl}/coins`)
        const {coins}=data.data
        setCointsList(coins);
      }

      const fetchTrans=async()=>{
        const data=await axios.get(`${baseUrl}/trans`)
        const {trans}=data.data
        setTransList(trans);
      }

    var result = coinsList.filter(coin => {
        return coin.Owner === currentUser.id.toString();
        
    });

    var result2 = transList.filter(trans => {
      return trans.Owner === currentUser.id.toString();
      
  });

    let balance = 0;
    result.forEach(coin => {
      balance = balance + (parseFloat(coin.CoinValue.replace(",", ""))*coin.CoinAmount);
    });


      useEffect(()=>{
        fetchCoins();
        fetchTrans();
      },[])

      
      const handleChange1= e =>{
        setCoinAmount(e.target.value);
      }
      
      const handleDelete = async (id,coinName,coinValue, Amount) => {
        try{
          
          console.log(Amount, coinAmount);

          if(coinAmount){
            if(Amount>coinAmount)
          {
            var temp=Amount-coinAmount;
            const data2=await axios.put(`${baseUrl}/coins/${id}`,{ownerId,coinName,coinValue,temp});
            const data=await axios.post(`${baseUrl}/trans`,{ownerId,coinName,coinValue,coinAmount,transType});

          }
          else if(Amount===coinAmount)
          {
            await axios.delete(`${baseUrl}/coins/${id}`);
            const data3=await axios.post(`${baseUrl}/trans`,{ownerId,coinName,coinValue,coinAmount,transType});
          }
          else if(Amount<coinAmount)
          {
            alert("You don't own that amount!");
          }
          }
          else alert("Please enter amount!");

          
          


          fetchCoins();
          fetchTrans();
    
        } catch(err){
          console.error(err.message)
        }
      }
      
    
      

      return(

    <div align="center"><table className="table">
    <thead>
      <tr>
        <th>Coin Name</th>
        <th>Coin Value</th>
        <th>Coin Amount</th>
      </tr>
    </thead>
    
    <tbody>
      {result.map((coin) => (
        <tr key={coin.id}>
          <td>{coin.CoinName}</td>
          <td>{coin.CoinValue}$</td>
          <td>{coin.CoinAmount}</td>
          <td><button className="dugmeWallet" onClick={() => handleDelete(coin.id,coin.CoinName,coin.CoinValue, coin.CoinAmount)}>Sell</button></td>
          <td><input onChange={handleChange1} type="text" className="form-control" placeholder="Enter amount"/></td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className="balance">Balance: {balance}$</div>
  <div></div>
  <div></div>
  <table className="table">
    <thead>
      <tr>
        <th>Coin Name</th>
        <th>Coin Value</th>
        <th>Coin Amount</th>
        <th>Transaction type</th>
        <th>Created At</th>
      </tr>
    </thead>
    
    <tbody>
      {result2.map((trans) => (
        <tr key={trans.id} id="Opa">
          <td>{trans.CoinName}</td>
          <td>{trans.CoinValue}$</td>
          <td>{trans.CoinAmount}</td>
          <td>{trans.TransType}</td>
          <td>{trans.created_at}</td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>


      )
}

