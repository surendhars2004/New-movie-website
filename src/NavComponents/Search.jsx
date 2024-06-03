import React, { useState, useRef, useEffect } from 'react';
import GlobalApi from '../Services/GlobalApi';
import { Navigate, useNavigate } from 'react-router-dom';


function Search() {
  let navigate = useNavigate();
  const [searchMovie, setSearchMovie] = useState(null); 
  const movieName = useRef();
  const Image_base_url = "https://image.tmdb.org/t/p/w500";
  const [trendingMoviesList, setTrendingMoviesList] = useState([]);

  const searchMovieHandler = () => {
    fetch(`http://www.omdbapi.com/?apikey=61e576a4&t=${movieName.current.value}`)
    .then((data)=>{
      return data.json()
    })
    .then((data)=>{
      console.log(data)
      setSearchMovie(data)
    })
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchMovieHandler();
    }
  };

  const handleSvgClick = () => {
    searchMovieHandler();
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = () => {
    GlobalApi.getTrendingVideos()
      .then(resp => {
        console.log(resp.data.results);
        setTrendingMoviesList(resp.data.results);
      })
  };
  const handleMovieClick = (movie) => {
    navigate(`/details/${movie.id}`, { state: { movie } });
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <section className='flex justify-center items-center relative'>
        <input 
          type="text" 
          ref={movieName} 
          onChange={searchMovieHandler} 
          className='w-[80%] my-5 py-4 md:py-4 pl-3 rounded-xl bg-[#252833] md:text-xl text-sm focus:outline-none hover:outline-none focus:text-white' 
          placeholder='Search Movies.. TV shows..'
        />
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          fill="gray" 
          className="bi bi-search absolute right-[12%] max-sm:w-4 max-sm:h-4" 
          viewBox="0 0 16 16" 
          onClick={handleSvgClick}
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
      </section>

      {searchMovie && (
        <div className='flex justify-center items-center'>
          <div className="flex overflow-hidden items-end shadow-sm p-8 max-sm:flex-col">
            <img 
              src={searchMovie.Poster}
              alt={searchMovie.Title}
              className='w-[160px] max-sm:w-full md:w-[250px] md:h-[350px] object-cover rounded-md hover:border-[3px] hover:border-gray-300 cursor-pointer hover:scale-105 transition-all duration-150 ease-in'
            />
            <div className="p-8 w-[300px] md:w-[500px] max-sm:w-full max-sm:p-3">
              <h5 className="text-2xl font-bold leading-none tracking-tight text-[#FF7D29]">{searchMovie.Title}</h5>
              <p className="text-[#FFBF78] mt-2">{searchMovie.Released}</p>
              <p className="my-4 text-sm text-white">{searchMovie.Plot}</p>
              <div className="flex items-center gap-3 mt-4">
              <button className="flex justify-center items-center gap-2  px-24  h-10  text-sm hover:text-[#FF7D29] font-medium hover:bg-white bg-[#FF7D29] rounded-md  ">
                <span className=' font-bold '>Watch Now</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              <button className=" bg-white hover:bg-[#FF7D29] rounded-md p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                </svg>
              </button>
            </div>
            </div>
          </div>
        </div>
      )}

      <section>
        <h2 className="text-white m-10 font-semibold text-xl">Top Trending Movies</h2>
        <div className='flex gap-2 md:gap-6 flex-wrap justify-around px-1 md:px-10 scroll-smooth py-3'>
          {
            trendingMoviesList.map((movie, index) => (
              <img 
                src={Image_base_url + movie.poster_path} 
                alt="" onClick={() => handleMovieClick(movie)}
                className='w-[90px] md:w-[210px] my-1 rounded-md hover:border-[3px] hover:border-gray-300 cursor-pointer hover:scale-105 transition-all duration-150 ease-in' 
                key={index} 
              />
            ))
          }
        </div>
      </section>
    </div>
  );
}

export default Search;
