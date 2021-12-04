import React, { useState, useEffect } from 'react';
import './App.css';



function App() {

  const [quotes, setQoutes] = useState([]);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    
    fetchQuote()
  },[]);

  

  const fetchQuote = () => {
    let url = ' https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json'
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setQoutes(data);
      }
        
      )
  }

  const randomQuote = () => {
    return Math.floor((Math.random() * quotes.length -1) + 1); 
  }

  const handle = () => {
    takeQuote();
  }
  return (
    <div className="App">
       <div className="quotes">
         <h2>{quotes}</h2>
         <p>{author}</p>
       </div>
       <button className="button1" disabled={!quotes}>Następny</button>
    </div>
  );
}

export default App;
