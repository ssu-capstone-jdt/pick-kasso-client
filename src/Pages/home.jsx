import React from 'react'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import CurriculumCard from '../Components/CurriculumCard/CurriculumCard'
import { all_product } from '../Components/Assets/all_product'
import './home.css'

const home = () => {

  return (
    <div className='home'>
      <div className="calendar-container">
        <Calendar />
      </div>
      <div className="curriculum-gallery">
        {all_product.map((curriculum, index) => (
          <CurriculumCard
            key={index}
            curriculum_background={curriculum.curriculum_background}
            curriculum_title={curriculum.curriculum_title}
            curriculum_info={curriculum.curriculum_info}
          />
        ))}
      </div>
    </div>
  )
}

export default home