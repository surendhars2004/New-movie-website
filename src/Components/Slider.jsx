import React, { useEffect, useState,useRef } from 'react';
import getTrendingVideos from '../Services/GlobalApi';
import GlobalApi from '../Services/GlobalApi';
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import { Navigate, useNavigate } from 'react-router-dom';


function Slider() {
  const elementRef = useRef()
  let navigate = useNavigate();  
 /*  const desiredIndices = [1, 4, 11, 12, 15, 16,  18]; */
    const desiredIndices = [0, 1, 2, 3, 4, 6, 8, 10, 11, 13, 14, 16, 17, 18]; 

    const Image_base_url ="https://image.tmdb.org/t/p/original"
    const [trendingMoviesList, setTrendingMoviesList] = useState([]);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = () => {
    GlobalApi.getGenreBasedMovies(12)
      .then(resp => {
        console.log(resp.data.results);
        setTrendingMoviesList(resp.data.results)
      })
  }
  const sliderRight=(element)=>{
    element.scrollLeft+= window.innerWidth-76
  }
  const sliderLeft=(element)=>{
    element.scrollLeft-=window.innerWidth-76
  }
  const handleMovieClick = (movie) => {
    navigate(`/details/${movie.id}`, { state: { movie } });
  };

  return (
    <div className="relative">
      <HiChevronLeft className='hidden md:block text-[#ffffff98] text-[35px] absolute mx-3 mt-[175px] cursor-pointer' onClick={()=>sliderLeft(elementRef.current)}/>
      <HiChevronRight className='hidden md:block text-[#ffffff98] text-[35px] absolute mx-3 mt-[175px] cursor-pointer right-0' onClick={()=>sliderRight(elementRef.current)} />
    
      <div className='flex overflow-x-auto mt-0 w-full px-10 py-4 scrollbar-hide scroll-smooth' ref={elementRef}>
      {
        trendingMoviesList.map((movie, index) => {
          if (desiredIndices.includes(index)) {
            return (
              <img
                key={index}
                src={Image_base_url + movie.backdrop_path}
                alt="" onClick={() => handleMovieClick(movie)}
                className='min-w-full md:h-[360px] object-cover object-top mr-5 rounded-md hover:border-[2px] hover:border-gray-300 transition-all duration-100 ease-in-out'
              />
            );
          }
        })
      }
      </div>
    </div>
  );
}

export default Slider;
