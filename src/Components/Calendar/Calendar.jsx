import React from 'react'
import './Calendar.css'
import calendar_icon from '../Assets/calendar@2x.png'

const Calendar = () => {
  return (
    <div className='calendar'>
      <img src={calendar_icon} alt="" className="calendar_icon"/>
    </div>
  )
}

export default Calendar
