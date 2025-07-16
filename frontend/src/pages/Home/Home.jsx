import React from 'react'
import Slider from './Slider/Slider'
import Collection from '../../components/Collection/Collection'
import { Link } from 'react-router-dom'
import './home.scss'
const Home = () => {
  return (
    <div>
      <Slider />
      <div className='flex justify-between pt-16 pb-10 home-viewall'>
        <h1>Pet Anyone</h1>
        <Link to='/shop'>View All</Link>
      </div>
      <Collection maxItems={4}></Collection>
    </div>
  )
}

export default Home