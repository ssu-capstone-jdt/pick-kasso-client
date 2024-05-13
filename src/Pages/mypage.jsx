import React from 'react'

const MyPage = () => {
  return (
    <div  className='mypage'>
      <div className="left">
        <div className="user">
           {/* image */}
           {/* nickname */}
           {/* setting_ICON */}
           <p>nickname</p>
        </div>
        <div className="nav-bar">
          <button>나의 그림</button>
          <button>나의 보관함</button>
        </div>
      </div>
      <div className="right">
        <h1>나의 그림</h1>
        <hr/>
        {/* <Item></Item> */}
      </div>
    </div>
  )
}

export default MyPage
