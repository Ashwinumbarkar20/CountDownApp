import React from 'react'
import './Boxes.css'
export default function Boxes({title,value}) {
  return (
    <div className='Time_container'>
    <h1>{value}</h1>
    <h4>{title}</h4>
    </div>
  )
}
