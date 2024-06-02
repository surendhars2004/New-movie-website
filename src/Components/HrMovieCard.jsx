import React, { useEffect, useRef, useState } from 'react';
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import GlobalApi from '../Services/GlobalApi';
import { Navigate, useNavigate } from 'react-router-dom';


function MovieCard({ genreId }) {
    let navigate = useNavigate();
    const elementRef = useRef();
    const Image_base_url = "https://image.tmdb.org/t/p/w500";
    const [genreMoviesCollection, setGenreMoviesCollection] = useState([]);

    useEffect(() => {
        genreMovies();
    });

    const genreMovies = () => {
        GlobalApi.getGenreBasedMovies(genreId.id).then(resp => {
            setGenreMoviesCollection(resp.data.results);
        });
    };

    const sliderRight = (element) => {
        element.scrollLeft += window.innerWidth - 60;
    };

    const sliderLeft = (element) => {
        element.scrollLeft -= window.innerWidth - 60;
    };
    const handleMovieClick = (movie) => {
        navigate(`/details/${movie.id}`, { state: { movie } });
        window.scrollTo(0, 0);
    };

    return (
        <div className="relative">
            {genreMoviesCollection.length>0 &&
            <>
                <HiChevronLeft className='hidden md:block text-[#ffffffe0] text-[35px] absolute z-50 mx-3 mt-[70px] cursor-pointer ' onClick={() => sliderLeft(elementRef.current)} />
                <HiChevronRight className='hidden md:block text-[#ffffffe0] text-[35px] absolute z-50 mx-3 mt-[70px] cursor-pointer right-0' onClick={() => sliderRight(elementRef.current)} />
            </>
            }
            
            <div className='flex gap-3 md:gap-6 overflow-x-auto scrollbar-hide px-8 md:px-10 scroll-smooth py-3' ref={elementRef}>
                {
                    genreMoviesCollection.map((movie, index) => (
                        <section className='hover:scale-105 transition-all duration-150 ease-in '>
                            <img src={Image_base_url +  movie.backdrop_path} alt="" onClick={() => handleMovieClick(movie)}
                            className='w-[150px] md:w-[250px] rounded-md hover:border-[3px] hover:border-gray-300 cursor-pointer' />
                            <h2 className='w-[150px] md:w-[250px] text-white mb-0 text-center nunito-sans mt-1'>{movie.title}</h2>
                        </section>
                    ))
                }
            </div>
        </div>
    );
}

export default MovieCard;
