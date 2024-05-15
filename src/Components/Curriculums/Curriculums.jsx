import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfoComponent from '../InfoComponent';
import './Curriculums.css'

const Curriculums = ({ activeButton }) => {
  const [curriculums, setCurriculums] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/curriculums/all')
      .then(response => {
        const data = response.data;  // Assume response.data is an array of curriculums
        filterCurriculums(data, activeButton);
        setError(false); // Reset error state if successful response
      })
      .catch(error => {
        console.error('Error fetching curriculum Data:', error);
        setError(true); // Set error state if failed to fetch data
      });
  }, [activeButton]);

  const filterCurriculums = (data, buttonNumber) => {
    let filteredData;
    switch (buttonNumber) {
      case 1: 
        filteredData = data;
        break;
      case 2: 
        filteredData = data.filter(cur => cur.cur_difficulty === 'easy');
        break;
      case 3: 
        filteredData = data.filter(cur => cur.cur_difficulty === 'normal');
        break;
      case 4: 
        filteredData = data.filter(cur => cur.cur_difficulty === 'hard');
        break;
      default:
        filteredData = data;
    }
    setCurriculums(filteredData);
  };

  return (
    <div>
      {error && <p>Error loading data!</p>}
      {curriculums.map(cur => (
        <InfoComponent
          key={cur.cur_id}
          title={cur.cur_title}
          info={cur.cur_info}
          background={cur.cur_background}
          roundCount={cur.cur_round_count}
          difficulty={cur.cur_difficulty}
          state={cur.cur_state}
        />
      ))}
    </div>
  );
}

export default Curriculums;