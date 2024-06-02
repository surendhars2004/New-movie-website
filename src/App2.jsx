import React from 'react'
import Slider from './Components/Slider'
import ProductionHouse from './Components/ProductionHouse'
import GenreMovieList from './Components/GenreMovieList'

function App2() {
  return (
    <>
      <Slider/>
      <ProductionHouse/>
      <GenreMovieList indexNo="6"/>
    </>
  )
}

export default App2