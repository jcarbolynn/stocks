import { useState } from 'react'
import { Dropdown } from 'primereact/dropdown';
import './App.css'

function App() {
  const api_key = "API_KEY";
  const [stock, setStock] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buyDays, setBuyDays] = useState([]);

  const url = `http://api.marketstack.com/v2/eod?access_key=${api_key}&symbols=${stock.code}&limit=30`
  // const url = `http://api.marketstack.com/v1/eod?access_key=${api_key}&symbols=AAPL`

  const getStocks = async () => {
    try {
      const response = await fetch(url)
      const output = await response.text();
      setResult(JSON.parse(output))
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const stocks = [
    { name: 'Microsoft', code: 'MSFT' },
    { name: 'Amazon', code: 'AMZN' },
    { name: 'Netflix', code: 'NFLX' },
    { name: 'Alphabet', code: 'GOOGL' },
    { name: 'Nvidia', code: 'NVDA' }
  ];    
  
  function printDates() {
    const top_3 = []

    for (let i = 0; i < result.data.length; i++){
      const open = result.data[i].open
      const close = result.data[i].close

      // console.log(open-close)
      const difference = close-open
      top_3.push({i, difference});
    }

    top_3.sort((a,b) => b.difference - a.difference)
    // console.log(top_3.slice(0, 3))

    var today = new Date();

    function subtractDaysFromDate(currentDate, daysToSubtract) {
      daysToSubtract = daysToSubtract || 0
      // Instantiate a new object based on the current Date
      const pastDate = new Date(currentDate)
      // Subtract  the number of days
      pastDate.setDate(pastDate.getDate() - daysToSubtract)
  
      return pastDate
  }

  const top_3_dates = []
  for (let index = 0; index < 3; index++){
    // const month   = (subtractDaysFromDate(today, top_3[index].i).getUTCMonth() + 1).toString().padStart(2,"0"); // months from 1-12
    const month   = subtractDaysFromDate(today, top_3[index].i).toLocaleString('default', { month: 'long' })
    const day     = subtractDaysFromDate(today, top_3[index].i).getUTCDate().toString().padStart(2,"0");
    const year    = subtractDaysFromDate(today, top_3[index].i).getUTCFullYear();

    const date = `${month} ${day} ${year}`;

    top_3_dates.push(date)
    // setBuyDays(date)
  }

  console.log(top_3_dates)
  setBuyDays(top_3_dates)

    // top_3.forEach( day => {
    //   console.log(today - day.i)
    // })
    // setBuyDays()

    // result.data.forEach(day => {
    //   const {index} = day;
    //   const {open, close} = day.data;
    //   const difference = close-open
    //   console.log(difference)
    //   top_3.push({index, difference});
    //   // top_3.sort((a,b) => b.value - a.value)
    // })

    // result.map((day) => (
    //   console.log(day.open);
    //   console.log(day.close);
    // ))
  }

  return (
    <>
    <div className='StockSearch'>
      <div className="dropdown-div">
        <Dropdown
          value={stock}
          onChange={(e) => setStock(e.value)}
          // onChange={(e) => console.log(e.value)}
          options={stocks}
          optionLabel="name" 
          placeholder="Select a Stock"
          className="dropdown"
        />

        <button
          type="submit"
          onClick={getStocks}
          // disabled={true}
          disabled={loading}
        >Stocks!</button>

        
        <button
          type="submit"
          onClick={printDates}
          // disabled={true}
          disabled={loading}
        >see dates</button>
      </div>

      <div className='dateOutput'>
        {error && <div className="error-message">{error}</div>}

          {loading ? (<div className="loading">Loading...</div>) : 
            <div>
              You should have bought this stock:

              {buyDays.map((item, index) => (
                <p key={index}>{item} </p>
              ))}
            </div>
          }
      </div>

    </div>
  </>
  )
}

export default App
