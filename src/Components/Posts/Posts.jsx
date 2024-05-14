import React from 'react'
import './Posts.css'
import data_post from '../Assets/post'
import Item_p from '../Item_p/Item'

const Posts = () => {
  return (
    <div className='posts'>
      <div className="post-grid">
        {data_post.map((item,i)=>{
            return <Item_p key={i} 
            id={item.id} 
            // name={item.name} 
            image={item.image} 
            // new_price={item.new_price} 
            // old_price={item.old_price}
            />
        })}
      </div>
    </div>
  )
}

export default Posts
