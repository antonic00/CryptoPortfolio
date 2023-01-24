import React,{ useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { UserContext } from "../UserContext";
import './Coin.css'


const baseUrl="http://localhost:5000"

const Coin = () => {

    const navigate = useNavigate();

    const {currentUser}=useContext(UserContext);
    const params = useParams();
    const [coin, setCoin] = useState({});
    const [ownerId, setOwnerId]=useState(null);

    const [coinName, setCoinName]=useState("");
    const [coinValue, setCoinValue]=useState("");
    const [transType]=useState("Bought");

    const [coinAmount,setCoinAmount] = useState(0);

    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`

    useEffect(() => {
        axios.get(url).then((res) => {
            setCoin(res.data)
            setOwnerId(currentUser.id);
            setCoinName(res.data.name);
            setCoinValue(res.data.market_data.current_price.usd.toLocaleString());
        }).catch((error) =>{
            console.log(error)
        })    
        }, [])
        console.log(coinName);

    const handleSubmit = async (e) =>{
        e.preventDefault();      

        if(!currentUser){
            navigate("/login");
            alert("Morate biti ulogovani!");
            return;
        }

        try{
            
            const data=await axios.post(`${baseUrl}/buy-coin`,{ownerId,coinName,coinAmount,coinValue});
            const data2=await axios.post(`${baseUrl}/trans`,{ownerId,coinName,coinValue,coinAmount,transType});

            alert("Uspesno obavljena kupovina!");
    
        }catch(err){
          console.error(err.message);
        }
        
      }

  const handleChange1= e =>{
    setCoinAmount(e.target.value);

  }


        return (
            <div>
                <div className='coin-container'>
                    <div className='content'>
                        <h1>{coin.name}</h1>
                    </div>
                    <form onSubmit={handleSubmit}> 
                    <div className='content'>
                        <div className='rank'>
                            <span className='rank-btn'>Rank # {coin.market_cap_rank}</span>
                        </div>
                        <div className='info'>
                            <div className='coin-heading'>
                                {coin.image ?<img src={coin.image.small} alt='' /> :null}
                                <p>{coin.name}</p>
                                {coin.symbol ? <p>{coin.symbol.toUpperCase()}/USD</p>: null}
                              
                            </div>
                            <div className='coin-price'>
                                {coin.market_data?.current_price? <h1>${coin.market_data.current_price.usd.toLocaleString()} </h1> :null}
                                <input
                                    onChange={handleChange1}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter amount"
                                />
                            </div>
                            
                            <div align="right">
                                <button type="submit" className='buttonBuy' >BUY</button>
                            </div>
                        </div>
                    </div>
                    </form>
                    <div className='content'>
                        <table>
                            <thead>
                                <tr>
                                    <th>1h</th>
                                    <th>24h</th>
                                    <th>7d</th>
                                    <th>14d</th>
                                    <th>30d</th>
                                    <th>1y</th>
                                    
                                </tr>

                            </thead>
                            <tbody>
                                <tr>
                                    <td>{coin.market_data?.price_change_percentage_1h_in_currency  ?<p>{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</p> : null}</td>
                                    <td>{coin.market_data?.price_change_percentage_24h_in_currency ?<p>{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p> : null}</td>
                                    <td>{coin.market_data?.price_change_percentage_7d_in_currency  ?<p>{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                                    <td>{coin.market_data?.price_change_percentage_14d_in_currency ?<p>{coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                                    <td>{coin.market_data?.price_change_percentage_30d_in_currency ?<p>{coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                                    <td>{coin.market_data?.price_change_percentage_1y_in_currency  ?<p>{coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%</p>: null}</td>

                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className='content'>
                        <div className='stats'>
                            <div className='left'>
                                <div className='row'>
                                <h4>24 Hour Low</h4>
                                {coin.market_data?.low_24h ?<p>${coin.market_data.low_24h.usd.toLocaleString()}</p> :null}
                                </div>
                                
                                <div className='row'>
                                <h4>24 Hour High</h4>
                                {coin.market_data?.high_24h ? <p>${coin.market_data.high_24h.usd.toLocaleString()}</p> :null}
                            </div>
                        </div>
                             <div className='right'>
                             <div className='row'>
                                <h4>Market Cap</h4>
                                {coin.market_data?.market_cap ? <p>${coin.market_data.market_cap.usd.toLocaleString()}</p> :null}

                            </div>
                            <div className='row'>
                                <h4>Circulating Supply</h4>
                                {coin.market_data ? <p>{coin.market_data.circulating_supply}</p> :null}

                           
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className='content'>
                <div className='about'>
                <h3>About</h3>
                <p dangerouslySetInnerHTML={{
                    __html:DOMPurify.sanitize(coin.description ? coin.description.en : ''),
                }}>

                </p>
                </div>
            </div>
            </div>
            </div>
        )
    
        
    
}
export default Coin