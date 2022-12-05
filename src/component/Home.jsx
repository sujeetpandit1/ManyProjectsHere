import React, { useState } from 'react'
import './HomeStyle.css'
import LinkResult from './LinkResult'

const Home = () => {

  const [value, setValue] = useState("")
  const [inputValue, setInputValue] = useState("")
  const handleClick = () => {
    setInputValue(value)
    setValue("");
  }
  return (
    
    <div className='home' setInputValue={setInputValue}>
    <h1 className='heading'> URL <span>Sortner</span></h1>
      <input 
        type="text" 
        placeholder="Paste Long URL Here"
        value={value}
        onChange={e => setValue(e.target.value)}
        ></input>
      <div className='button' onClick={handleClick}> Click Here to Sort</div>

      <LinkResult inputValue={inputValue}/>
    </div>
  )
}

export default Home
