import { BrowserRouter as Router} from "react-router-dom"

import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';

import NavBar from "./components/NavBar"
import AnimatedRoutes from "./components/AnimatedRoutes";


function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <NavBar />
      <AnimatedRoutes />
    </Router>
    </ThemeProvider>
  )
}

export default App