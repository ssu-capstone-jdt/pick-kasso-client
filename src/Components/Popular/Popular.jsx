// import React from 'react'
// import './Popular.css'
// import data_product from '../Assets/data'
// import Item from '../Item/Item'

// const Popular = () => {
//   return (
//     <div className='popular'>
//       <div className="popular-item">
//         {data_product.slice(0, 3).map((item,i)=>{
//             return <Item key={i} 
//             id={item.id} 
//             name={item.name} 
//             image={item.image} 
//             // new_price={item.new_price} 
//             // old_price={item.old_price} 
//             cur_info={item.cur_info}/>
//         })}
//       </div>
//     </div>
//   )
// }

// export default Popular

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Popular.css';
import Item from '../Item/Item';

const Popular = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8080/curriculums')
      .then(response => {
        setItems(response.data); // Axios wraps the response data inside the data property
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  return (
    <div className='popular'>
      <div className="popular-item">
        {items.slice(0, 3).map((item, i) => {
          return <Item key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            // new_price={item.new_price}
            // old_price={item.old_price}
            cur_info={item.cur_info} />
        })}
      </div>
    </div>
  );
}

export default Popular;
