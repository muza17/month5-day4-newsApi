import { useState, useEffect } from 'react';
import React from 'react';
import './news.css';

function News(){
    //hooks
    const [users, setUsers] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [theme, setTheme] = useState(window.localStorage.getItem("theme") || "light");

    useEffect(() =>{
        fetch("https://newsapi.org/v2/everything?q=tesla&from=2021-12-16&sortBy=publishedAt&apiKey=1d9a66d751e14db19aa5d7d5d3a11cde")
            .then(res => res.json())
            .then(users => setUsers(users.articles))
    }, [])

    const changeTheme = (e) => {
        setTheme(e.target.value);
        window.localStorage.setItem("theme", e.target.value);

    }

    return(
        <div className={theme}>
            <div className="container">
                <select className='select' defaultValue={theme} onChange={(e) => changeTheme(e)}>
                    <option value={"light"}>Theme1</option>
                    <option value={"dark"}>Theme2</option>
                </select>
                <h1 className="heading">Find news</h1>
                <input className='input' onChange={ (e) => setInputValue(e.currentTarget.value.trim())}/>

                <div className="cards">
                    {
                         users.filter((item) => {
                            if(inputValue == ""){
                                return 0
                            }else if(item.title.toLowerCase().includes(inputValue.toLowerCase())){
                                return item
                            }
                        }).map((item, index) => {
                            return (
                                <div className='card' key={index}>
                                    <img className='card-img' src={item.urlToImage} width={266} height={250} border-radius={10} alt="" />
                                    <h3 className='card-title'>Title: {item.title}</h3>
                                    <p className='card-author'> Author: {item.author}</p>
                                    <p className='card-content'>Content: {item.content}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default News;