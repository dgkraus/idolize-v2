import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
  
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
      <div>
        <h1>Idol Profile</h1>
        <p><strong>Name:</strong> {idol.idol_name}</p>
        <p><strong>Nickname:</strong> {idol.nickname}</p>
        <p><strong>Birthdate:</strong> {idol.birthdate}</p>
        <p><strong>Birthplace:</strong> {idol.birthplace}</p>
        <p><strong>Height:</strong> {idol.height} cm</p>
        <p><strong>Zodiac Sign:</strong> {idol.zodiac}</p>
        <p><strong>Twitter:</strong> <a href={idol.sns.Twitter} target="_blank" rel="noopener noreferrer">{idol.sns.Twitter}</a></p>
        <p><strong>Instagram:</strong> <a href={idol.sns.Instagram} target="_blank" rel="noopener noreferrer">{idol.sns.Instagram}</a></p>
        <p><img src={idolImage} alt="not found"></img></p>
      </div>
    )
  }