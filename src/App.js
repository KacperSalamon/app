import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [previousQuote, setPreviousQuote] = useState(null);

  // Pobranie cytatów
  const fetchQuote = useCallback(() => {
    let url = ' https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json'
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // Ustawienie pierwszego cytatu
        setCurrentQuote(data[getRandomNumber(data.length - 1)]);
        setQuotes(data);
      }).catch((err) => {
        console.error(err)
      })
  }, [])

  // Pobranie cytatów przy starcie apki
  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  // Losowanie liczby z maksymalnym zakresem
  const getRandomNumber = (maxScope) => {
    return Math.floor(Math.random() * (maxScope + 1)); 
  }

  // Funkcja ustawia poprzedni cytat na null żeby nie dało się cofać w nieksończoność i aktualny ustawia na ostatni poprzedni
  const handlePreviousQuoteClick = () => {
    console.log("prevoius quote");
    setCurrentQuote(previousQuote);
    setPreviousQuote(null);
  }

  // Funkcja ustawia aktualny cytat na poprzedni i losuje nowy
  const handleNextQuoteClick = () => {
    console.log("next quote")
    setPreviousQuote(currentQuote);
    setCurrentQuote(quotes[getRandomNumber(quotes.length - 1)])
  }

  return (
    <div className="App">
       <div className="quotes">
          {
             currentQuote ? (
              <>
                <h2>
                  {currentQuote.quote}
                </h2>
                <p>
                  {currentQuote.author}
                </p>
           </>) : <></>
           }
       </div>
       {/* Przycisk będzie nieaktywny jeśli poprzedni cytat nie bedzie dostępny */}
       <button className="button1" onClick={handlePreviousQuoteClick} disabled={!previousQuote}>Poprzedni</button>
       {/* Przycisk nie bedzie aktywny jeśli lista cytatów nie będzie dostępna */}
       <button className="button1" onClick={handleNextQuoteClick} disabled={!quotes}>Następny</button>
    </div>
  );
}

export default App;
