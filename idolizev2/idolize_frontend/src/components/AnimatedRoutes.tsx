import React from 'react'
import { IdolSearch } from './IdolSearch'
import { ProfileView } from './ProfileView'
import { Route, Routes, useLocation } from 'react-router-dom'

import {AnimatePresence} from "framer-motion"

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<IdolSearch />} />
        <Route path="/idols/:idolId" element={<ProfileView />} />
    </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes