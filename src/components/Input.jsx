import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

const Input = (props) => {

    const stocks = [
        { name: 'Microsoft', code: 'MSFT' },
        { name: 'Amazon', code: 'AMZN' },
        { name: 'Netflix', code: 'NFLX' },
        { name: 'Alphabet', code: 'GOOGL' },
        { name: 'Nvidia', code: 'NVDA' }
      ];  

    return (

        // <p>HELLO</p>
        <Dropdown
            value={props.stock}
            onChange={(e) => props.setStock(e.value)}
            // onChange={(e) => console.log(e.value)}
            options={stocks}
            optionLabel="name" 
            placeholder="Select a Stock"
            className="dropdown"
        />
    )
}

export default Input