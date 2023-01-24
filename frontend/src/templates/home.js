import React, { useState } from 'react'
import CoinItem from './CoinItem'
import './Coins.css'
import Coin from '../routes/Coin'
import { Link } from 'react-router-dom'

const Home = (props) => {

    // search
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
    };

    return (
      <div className ='container'> 
        <div >
          <input className='searchTerm' type="text" placeholder="Search here" 
            onChange={handleChange} value={searchInput} />
         </div>
            <div>
              <div className='heading'>
              <p>#</p>
              <p className='coin-name'>Coin</p>
              <p>Price</p>
              <p>24h</p>
              <p className='hide-mobile'>Volume</p>
              <p className='hide-mobile'>Mkt Cap</p>
              </div>

              {props.coins.filter((coin) => coin.name.toLowerCase().includes(searchInput)).
              map(coins =>{
                return(
                  <Link to={`/coin/${coins.id}`} element ={<Coin />} key={coins.id}>
                    <CoinItem coins={coins}/> 
                  </Link>
                )
              })}
           </div>
           
      </div>
    )
  } 
export default Home;
