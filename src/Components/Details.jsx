import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import GlobalApi from '../Services/GlobalApi';
import { Navigate, useNavigate } from 'react-router-dom';

function Details() {
  let navigate = useNavigate();
  const { state: { movie } } = useLocation();
  const Image_base_url = "https://image.tmdb.org/t/p/w500";
  const [relatedMovies, setRelatedMovies] = useState([]);
  
  console.log(movie);
  useEffect(()=>{
    console.log(movie.genre_ids[0]);
    genreMovies();
  },[]);

  const genreMovies = () => {
    GlobalApi.getGenreBasedMovies(movie.genre_ids[0]).then(resp => {
      console.log(resp.data.results);
      setRelatedMovies(resp.data.results);
    });
  };

  const handleMovieClick = (movie) => {
    window.scrollTo(0, 0);
    navigate(`/details/${movie.id}`, { state: { movie } });
  };

  return (
    <section>
      <div>
      <div className='flex justify-center items-center md:mt-10'>
        <div className="flex overflow-hidden items-end shadow-sm p-8 max-sm:flex-col">
          <img src={Image_base_url + movie.poster_path}
            className='w-[160px] max-sm:w-full md:w-[250px] md:h-[350px] object-cover rounded-md hover:border-[3px] hover:border-gray-300 cursor-pointer hover:scale-105 transition-all duration-150 ease-in'
          />
          <div className="p-8 w-[300px] md:w-[500px] max-sm:w-full max-sm:p-3">
            <h5 className="text-2xl font-bold leading-none tracking-tight text-[#FF7D29]">{movie.title || movie.name}</h5>
            <p className="text-[#FFBF78] mt-2">{movie.release_date}</p>
            <p className="my-4 text-sm text-white">{movie.overview}</p>
            <p className="text-[#FFEEA9] text-sm">{movie.vote_average} ratings</p>
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
      </div>
      <section>
        <h2 className="text-white m-10 font-semibold text-xl">Top Related Movies</h2>
        <div className='flex gap-3 md:gap-6 flex-wrap justify-around px-10 scroll-smooth py-3'>
          {
            relatedMovies.map((movie, index) => (
              <img src={Image_base_url +  movie.poster_path} alt="" onClick={() => handleMovieClick(movie)}
                className='w-[100px] md:w-[210px] rounded-md hover:border-[3px] hover:border-gray-300 cursor-pointer
                hover:scale-105 transition-all duration-150 ease-in' key={index} />
            ))
          }
        </div>
      </section>
    </section>
  );
}

export default Details;
