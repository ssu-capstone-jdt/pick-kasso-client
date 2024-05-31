import React, { useState } from 'react';
import Posts from '../Components/Posts/Posts'
import './Post.css'

const Post = () => {
  const [isInputReadOnly, setIsInputReadOnly] = useState(true);
  const [inputValue, setInputValue] = useState('1234');

  const handleInputClick = () => {
    setIsInputReadOnly(false);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  return (
    <div className='post'>
      <button id='buttonid'>
        타이머
      </button>
      <input id='invoice_no_0'/>
      <input id='invoice_no_1' value={inputValue} onClick={handleInputClick} onChange={handleInputChange} readOnly={isInputReadOnly} />
      
      <Posts/>
    </div>
  )
}

export default Post
