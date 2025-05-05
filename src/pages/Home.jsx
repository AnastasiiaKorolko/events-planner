import React from 'react';
import { useSelector } from 'react-redux';
import EventPlanner from '../components/EventPlanner';
import './Home.css'

const Home = () => {
  const user = useSelector(state => state.auth.user);
  
  return (
    <div className="home-page container">
      <div className="welcome-section">
        <h1 className='congrats'>ВІТАЄМО, {user?.name?.toUpperCase() || 'КОРИСТУВАЧ'}!</h1>
        <p>Це ваша особиста сторінка для планування подій. Створюйте нові події та перетягуйте їх у календар для організації свого розкладу.</p>
      </div>
      
      <EventPlanner />
      
    </div>
  )
}

export default Home;