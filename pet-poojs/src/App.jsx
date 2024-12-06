import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TableContainer from './component/tableContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TableContainer/>
    </>
  )
}

export default App
