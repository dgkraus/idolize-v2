import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/Profile.css"
import { motion } from "framer-motion"
  
  export const ProfileView: React.FC = () => {
    const { idolId } = useParams()
    const [idol, setIdol] = useState<any | null>(null)
    const [error, setError] = useState('')
  
    useEffect(() => {
      if (!idolId)  return

      axios
        .get(`http://127.0.0.1:8000/api/idols/${idolId}/`)
        .then((response) => {
          setIdol(response.data);
        })
        .catch((error) => {
          console.error(error)
          setError('Failed to fetch data')
        });
    }, [idolId])
  
    if (error) {
      return <div>{error}</div>
    }
  
    if (!idol) {
      return <div>Loading...</div>
    }

    const idolImageName = idol.idol_name.replace(" ", "_")
    const images = require.context('../assets/idol_pictures', false, /\.jpg$/)
    const idolImage = images(`./${idolImageName}_profile_pic.jpg`)
  
    return (
      <motion.div
      initial={{width: 0}}
      animate={{width: "100%"}}
      exit={{x: window.innerWidth, transition: {duration: 0.1}}} 
      className="profile-container">
        <div className="profile-details">
          <h1 className="profile-name">{idol.idol_name}</h1>
          <div className="sns-links">
          <a
            href={idol.sns.Twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="twitter"
          > </a>
          <a
            href={idol.sns.Instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram"
          > </a>
          <a
            href={idol.sns.TikTok}
            target="_blank"
            rel="noopener noreferrer"
            className="tiktok"
          > </a>
          <a
            href={idol.sns.Youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="youtube"
          > </a>
          <h3 className="age">Age: {idol.birthdate}</h3>
          <h3 className="birthplace">Birthplace: {idol.birthplace}</h3>
          <h3 className="height">Height: {idol.height} cm</h3>
          <h3 className="zodiac">Zodiac: {idol.zodiac}</h3>
        </div>
        <p className="profile-description">
          Add interesting information about performer that fans want to know.
          </p>
      </div>
        <div className="profile-image-container">
          <img src={idolImage} alt={idol.idol_name} className="profile-image" />
        </div>
      </motion.div>
    )
  }