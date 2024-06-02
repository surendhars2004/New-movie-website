import React from 'react'
import GenreList from '../Constant/GenreList'
import MovieCard from './MovieCard'
import HrMovieCard from './HrMovieCard'

function GenreMovieList({indexNo}) {
  return (
    <div id='movies'>
        {
            GenreList.genere.map((item,index)=>index<indexNo &&(
                <div>
                    <h2 className='py-2 px-8 md:px-10 text-white font-bold text-lg'>{item.name}</h2>
                    <div className="">
                        {index%2==0? <HrMovieCard genreId={item}/> :<MovieCard genreId={item}/>}
                        
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default GenreMovieList