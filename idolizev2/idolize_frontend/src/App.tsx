import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ProfileView } from "./components/ProfileView"
import { IdolForm } from "./components/IdolSearch"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IdolForm />} />
        <Route path="/idols/:idolId" element={<ProfileView />} />
      </Routes>
    </Router>
  )
}

export default App