import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3";
const api_key = "0022b6a96050df4314e18f9cace0378f";
const search ='http://www.omdbapi.com/?apikey=61e576a4&t='

const getTrendingVideos = () => {
  return axios.get(`${movieBaseUrl}/trending/all/day?api_key=${api_key}`);
};

const getGenreBasedMovies = (id) => {
  return axios.get(`${movieBaseUrl}/discover/movie?api_key=${api_key}&with_genres=${id}`);
};

const searchMovies =(movie) => {
  return axios.get(`http://www.omdbapi.com/?apikey=61e576a4&t=${movie}`)
}
// Use named exports
export default { getTrendingVideos, getGenreBasedMovies,searchMovies };