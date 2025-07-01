import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container, Typography } from '@mui/material';
import Order from './components/order/order.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
   <Container maxWidth= "md">
     <Typography variant='h2' align='center' gutterBottom>
        Restaurant APP
     </Typography>
     <Order />
   </Container>
  )
}

export default App
