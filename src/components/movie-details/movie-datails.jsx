export const MovieDetails = ({movie, onMovieClick}) => {
    return (
     <div onClick={() => {onMovieClick(movie)}} >
        {movie.Title}
     </div>
     );
}