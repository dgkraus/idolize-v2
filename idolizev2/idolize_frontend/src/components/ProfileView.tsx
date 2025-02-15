import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Idol {
    id: number;
    idol_name: string;
    nickname: string;
    birthdate: string;
    birthplace: string;
    height: string;
    sns: {
      Twitter: string;
      Instagram: string;
    };
    zodiac: string;
  }
  
  export const ProfileView: React.FC = () => {
    const [idol, setIdol] = useState<Idol | null>(null);
    const [error, setError] = useState('');
  
    useEffect(() => {
      axios
        .get('http://127.0.0.1:8000/api/idols/1/')
        .then((response) => {
          setIdol(response.data);
        })
        .catch((error) => {
          console.error(error);
          setError('Failed to fetch data');
        });
    }, []);
  
    if (error) {
      return <div>{error}</div>;
    }
  
    if (!idol) {
      return <div>Loading...</div>;
    }
  
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
      </div>
    );
  };