import { useState } from "react";
import {MovieDetails} from "../movie-details/movie-datails";
import { MovieView } from "../movie-view/movie-view";

const movieList = [
  {
      "Genre": {
          "Name": "Crime",
          "Description": "Crime films focus on criminals, their motives, and their activities, often involving moral ambiguity."
      },
      "Director": {
          "Name": "Quentin Tarantino",
          "Bio": "American film director, writer, and actor.",
          "Birth": "1963"
      },
      "Actors": [],
      "_id": "66d83105a462a87562bfa885",
      "Title": "Pulp Fiction",
      "Description": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      "ImagePath": "https://www.themoviedb.org/t/p/w1280/vdeoTjDUbiZm1He25vA2Lpd3509.jpg",
      "Featured": true
  },
  {
      "Genre": {
          "Name": "Action",
          "Description": "Action films typically involve sequences with physical feats, fights, and chases."
      },
      "Director": {
          "Name": "Quentin Tarantino",
          "Bio": "American film director, writer, and actor.",
          "Birth": "1963"
      },
      "Actors": [],
      "_id": "66d83105a462a87562bfa886",
      "Title": "Kill Bill: Vol. 1",
      "Description": "After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.",
      "ImagePath": "https://www.themoviedb.org/t/p/w1280/1aRbVU0JnuEvMYDNBFEpENiSDtg.jpg",
      "Featured": false
  },
  {
      "Genre": {
          "Name": "Thriller",
          "Description": "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
      },
      "Director": {
          "Name": "Jonathan Demme",
          "Bio": "Robert Jonathan Demme was an American director, producer, and screenwriter.",
          "Birth": "1944",
          "Death": "2017"
      },
      "Actors": [],
      "_id": "66d83105a462a87562bfa880",
      "Title": "Silence of the Lambs",
      "Description": "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
      "ImagePath": "https://www.themoviedb.org/t/p/w1280/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg",
      "Featured": true
  },
  {
      "Genre": {
          "Name": "Sci-Fi",
          "Description": "Sci-Fi films explore imaginative and futuristic concepts, often with advanced technology and space exploration."
      },
      "Director": {
          "Name": "Christopher Nolan",
          "Bio": "This is a new bio for -British-American film director, producer, and screenwriter.",
          "Birth": "1970"
      },
      "Actors": [],
      "_id": "66d83105a462a87562bfa881",
      "Title": "Inception",
      "Description": "A skilled thief, the absolute best in the dangerous art of extraction, steals valuable secrets from deep within the subconscious during the dream state.",
      "ImagePath": "https://www.themoviedb.org/t/p/w1280/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
      "Featured": true
  },
  {
      "Genre": {
          "Name": "Action",
          "Description": "Action films typically involve sequences with physical feats, fights, and chases."
      },
      "Director": {
          "Name": "Steven Spielberg",
          "Bio": "American film director, producer, and screenwriter.",
          "Birth": "1946"
      },
      "Actors": [],
      "_id": "66d83105a462a87562bfa883",
      "Title": "Jurassic Park",
      "Description": "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting children after a power failure causes the park's cloned dinosaurs to run loose.",
      "ImagePath": "https://www.themoviedb.org/t/p/w1280/b1xCNnyrPebIc7EWNZIa6jhb1Ww.jpg",
      "Featured": true
  },
  {
      "Genre": {
          "Name": "Sci-Fi",
          "Description": "Sci-Fi films explore imaginative and futuristic concepts, often with advanced technology and space exploration."
      },
      "Director": {
          "Name": "Christopher Nolan",
          "Bio": "This is a new bio for -British-American film director, producer, and screenwriter.",
          "Birth": "1970"
      },
      "Actors": [],
      "_id": "66d83105a462a87562bfa882",
      "Title": "Interstellar",
      "Description": "This is the new Description for this movie.",
      "ImagePath": "https://www.themoviedb.org/t/p/w1280/bzONet3OeCTz5q9WOkGjVpOHMSR.jpg",
      "Featured": false
  },
  {
      "Genre": {
          "Name": "Drama",
          "Description": "Drama films rely on the emotional and relational development of realistic characters."
      },
      "Director": {
          "Name": "Steven Spielberg",
          "Bio": "American film director, producer, and screenwriter.",
          "Birth": "1946"
      },
      "Actors": [],
      "_id": "66d83105a462a87562bfa884",
      "Title": "Schindler's List",
      "Description": "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
      "ImagePath": "https://www.themoviedb.org/t/p/w1280/aP5O3sllb1JcBknTL4WoS4c6vTn.jpg",
      "Featured": true
  },
  {
      "Genre": {
          "Name": "Sci-Fi",
          "Description": "Sci-Fi films explore imaginative and futuristic concepts, often with advanced technology and space exploration."
      },
      "Director": {
          "Name": "Steven Spielberg",
          "Bio": "American film director, producer, and screenwriter.",
          "Birth": "1946"
      },
      "Actors": [],
      "_id": "66d83105a462a87562bfa889",
      "Title": "E.T. the Extra-Terrestrial",
      "Description": "A troubled child summons the courage to help a friendly alien escape Earth and return to his home world.",
      "ImagePath": "https://www.themoviedb.org/t/p/w1280/an0nD6uq6byfxXCfk6lQBzdL2J1.jpg",
      "Featured": false
  },
  {
      "Genre": {
          "Name": "Crime",
          "Description": "Crime films focus on criminals, their motives, and their activities, often involving moral ambiguity."
      },
      "Director": {
          "Name": "Quentin Tarantino",
          "Bio": "American film director, writer, and actor.",
          "Birth": "1963"
      },
      "Actors": [],
      "_id": "66d83105a462a87562bfa888",
      "Title": "Reservoir Dogs",
      "Description": "After a simple jewelry heist goes terribly wrong, the surviving criminals begin to suspect that one of them is a police informant.",
      "ImagePath": "https://www.themoviedb.org/t/p/w1280/xPEf4mDpMaJMx5BCr1wILfmPNU8.jpg",
      "Featured": false
  },
  {
      "Genre": {
          "Name": "Action",
          "Description": "Action films typically involve sequences with physical feats, fights, and chases."
      },
      "Director": {
          "Name": "Christopher Nolan",
          "Bio": "This is a new bio for -British-American film director, producer, and screenwriter.",
          "Birth": "1970"
      },
      "Actors": [],
      "_id": "66d83105a462a87562bfa887",
      "Title": "The Dark Knight",
      "Description": "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
      "ImagePath": "https://www.themoviedb.org/t/p/w1280/25cE7rTmSWVoRbBWTqIHAcvCtlK.jpg",
      "Featured": true
  }
]

export const MainView = () => {
  const [ movies , updateMovies] = useState(movieList);

  const [ selectedMovie, updateSelectedMovie] = useState(null);
  
  if (selectedMovie){
    return <MovieView  movie={selectedMovie}  onBackClick={() => {updateSelectedMovie(null)}}/>
  }
    
  if (movies.length === 0){
    return <div>Movie list is empty.</div>;
  }

  return (
    <div>
    
      {movies.map((movie) => {
          return <MovieDetails 
          key={movie._id} 
          movie={movie} 
          onMovieClick={(newSelectedMovie) => {updateSelectedMovie(newSelectedMovie)}}/>
      })}
    
   </div>
  )
  };

