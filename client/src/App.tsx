import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    axios.get('http://localhost:3001/api/count')
      .then(response => {
        setCount(response.data.count);
      })
      .catch(error => {
        console.error('There was an error fetching the count!', error);
      });
  }, []);

  const incrementCount = () => {
    axios.post('http://localhost:3001/api/count/increment')
      .then(response => {
        setCount(response.data.count);
      })
      .catch(error => {
        console.error('There was an error incrementing the count!', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="count-box">
          <p>Button has been pressed:</p>
          <span>{count} times</span>
        </div>
        <button onClick={incrementCount}>
          Press me
        </button>
      </header>
    </div>
  );
}

export default App;
