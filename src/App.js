import { useEffect, useState } from 'react';
import './App.css';
import CurencyInput from './components/CurencyInput';

const apiKey = "7ae455ae09288c420b683d00ff3a78e0"
const BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`;

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  // console.log(exchangeRate);

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency !== null && toCurrency != null) {
      fetch(`${BASE_URL}&base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <div className="App">
      <h1>Convert</h1>
      <CurencyInput
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onCurrencyChange={e => setFromCurrency(e.target.value)}
        amounts={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className='equals'>=</div>
      <CurencyInput
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onCurrencyChange={e => setToCurrency(e.target.value)}
        amounts={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </div>
  );
}

export default App;
