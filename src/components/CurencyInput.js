import React from 'react'

export default function CurencyInput({ amounts, onChangeAmount, currencyOptions, selectedCurrency, onCurrencyChange }) {
    return (
        <div>
            <input type="number" value={amounts} onChange={onChangeAmount} />
            <select value={selectedCurrency} onChange={onCurrencyChange}>
                {
                    currencyOptions.map(option => (

                        <option key={option} value={option}>{option}</option>

                    ))
                }
            </select>
        </div>
    )
}
