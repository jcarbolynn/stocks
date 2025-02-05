import { useState } from 'react'
import './App.css'

import Output from './components/Output';
import Input from './components/Input';


function App() {
  const api_key = "";
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buyDays, setBuyDays] = useState([]);
  const [stock, setStock] = useState("");

  const url = `http://api.marketstack.com/v2/eod?access_key=${api_key}&symbols=${stock.code}&limit=30`
  // const url = `http://api.marketstack.com/v1/eod?access_key=${api_key}&symbols=AAPL`

  const getStocks = async () => {
    try {
      const response = await fetch(url)
      const output = await response.text();
      const parseResult = JSON.parse(output);
      // setResult(parseResult)
      // issues with state variable? need to check if result for it to work

      printDates(parseResult)

      // if (result) {
      //   printDates(result)
      // }

    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  function printDates(result) {
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

  }

  return (
    <>
      <div className='StockSearch'>
        <div className="dropdown-div">

          < Input stock={stock} setStock={setStock}/>
    
          <button
            type="submit"
            onClick={getStocks}
            // disabled={true}
            disabled={loading}
          >Stocks!</button>

        </div>

        < Output error={error} loading={loading} buyDays={buyDays} />

      </div>
    </>
  )
}

export default App
