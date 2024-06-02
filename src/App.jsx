import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import App2 from './App2'
import Search from './NavComponents/Search'
import Header from './Components/Header'
import Categories from './NavComponents/Categories'
import Details from './Components/Details'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header /> {/* Render the Header component outside of the Routes */}
      <Routes>
        <Route path='/' element={<App2 />} />
        <Route path='/search' element={<Search />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/details/:movieId' element={<Details />} /> {/* Dynamic route for movie details */}
      </Routes>
    </div>
  )
}

export default App
