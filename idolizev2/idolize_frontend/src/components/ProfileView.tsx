import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/Profile.css"
import { motion } from "framer-motion"
import { Box, Tab, Button, ButtonGroup} from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab"
  
  export const ProfileView: React.FC = () => {
    const { idolId } = useParams()
    const [idol, setIdol] = useState<any | null>(null)
    const [error, setError] = useState('')

    const [value, setValue] = useState(0);

    /** will eventually be expanded to allow user to follow artist page and receive news when new content is added */
    const buttons = [
      <Button key="one">Follow</Button>,
    ]

    /** handles clicking the tabs below the profile information */
    const handleTabClick = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
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
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        className="profile-container"
      >
        <div className="profile-details-container">
          <div className="profile-details">
            <h1 className="profile-name">{idol.idol_name}</h1>
            <div className="sns-links">
              <a href={idol.sns.Twitter} target="_blank" rel="noopener noreferrer" className="twitter"> </a>
              <a href={idol.sns.Instagram} target="_blank" rel="noopener noreferrer" className="instagram"> </a>
              <a href={idol.sns.TikTok} target="_blank" rel="noopener noreferrer" className="tiktok"> </a>
              <a href={idol.sns.Youtube} target="_blank" rel="noopener noreferrer" className="youtube"> </a>
            </div>
            <h3 className="age">Age: {idol.birthdate}</h3>
            <h3 className="birthplace">Birthplace: {idol.birthplace}</h3>
            <h3 className="height">Height: {idol.height} cm</h3>
            <h3 className="zodiac">Zodiac: {idol.zodiac}</h3>
            <p className="profile-description">
              Add interesting information about {idol.idol_name}.
            </p>
          </div>
          <div className="profile-image-container">
            <img src={idolImage} alt={idol.idol_name} className="profile-image" />
          </div>
        </div>

        <div className = "button-container">
          <ButtonGroup variant="contained" aria-label="Basic button group">
            {buttons}
          </ButtonGroup>
        </div>
    
        <div className="tab-group">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabClick} aria-label="Idol Info Tabs">
              <Tab label="News" value="1" />
              <Tab label="Gallery" value="2" />
              <Tab label="Upcoming Events" value="3" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <p>Latest news about {idol.idol_name}.</p>
          </TabPanel>
          <TabPanel value="2">
            <p>Gallery of {idol.idol_name}.</p>
          </TabPanel>
          <TabPanel value="3">
            <p>Upcoming events featuring {idol.idol_name}.</p>
          </TabPanel>
        </TabContext>
        </div>
      </motion.div>
    );
  }