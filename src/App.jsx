import { useState, useEffect, useRef } from "react";
import Movies from "./components/Movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [lastMovie, setlastMovie] = useState();
  const [count, setCount] = useState(1);
  const elementRef = useRef(null);

  const fetchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=en-US&page=${count}`
    );
    const data = await response.json();
    setlastMovie(data.results[data.results.length - 1]);
    setMovies([...movies, ...data.results]);

    let observer = new IntersectionObserver(
      (entries, obs) => {
        console.log(entries);
      },
      {
        rootMargin: "0px 0px 0px 0px",
        threshold: 1.0,
      }
    );

    if (elementRef.current) {
      observer.observe(data.results[data.results.length - 1]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(lastMovie);
  const moviesData = movies;

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries, obs) => {
  //     console.log(entries)
  //     if (entries[0].isIntersecting) {
  //       setCount((prevCount) => prevCount + 1);
  //     }
  //   }, {
  //     rootMargin: '0px 0px 100px 0px',
  //     threshold: 1.0
  //   });

  //   if (elementRef.current) {
  //     observer.observe(elementRef.current);
  //   }

  //   return () => {
  //     if (elementRef.current) {
  //       observer.unobserve(elementRef.current);
  //     }
  //   };
  // }, []);

  return (
    <div className="container mx-auto flex p-5">
      <Movies movies={moviesData} elementRef={elementRef} />
    </div>
  );
}

export default App;
