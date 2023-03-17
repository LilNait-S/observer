function MoviesResult({ movies, elementRef }) {
  return (
    <div className="flex gap-5 flex-wrap justify-center">
      {movies.map((movie, index) => {
        return (
          <div key={movie.id + index} >
            <img
              className="h-auto max-w-xs min-h-min"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
            <h3>{movie.title}</h3>
            {
                index === movies.length - 1 ? (
                    <div className="h-60 flex justify-center items-center" ref={elementRef}>
                        <h3 >ultima pelicula</h3>
                    </div>
                ) : null
            }
          </div>
        );
      })}
    </div>
  );
}

function NoMoviesResult() {
  return <p>No se encontraron peliculas</p>;
}

export default function Movies({ movies , elementRef }) {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <MoviesResult movies={movies} elementRef={elementRef} /> : <NoMoviesResult />;
}
