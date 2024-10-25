import axios from "axios";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BerandaView from "./BerandaView";
import { useDispatch, useSelector } from "react-redux";

const nilaiDefault = {
  data: [],
  filterData: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BERHASIL":
      return {
        ...state,
        data: action.payload,
        filterData: action.payload,
        loading: false,
      };
    case "SET_FILTER":
      return {
        ...state,
        filterData: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      throw new Error("Error in reducer case");
  }
};

const Beranda = () => {
  const [state, dispatch] = useReducer(reducer, nilaiDefault);
  const [cari, setCari] = useSearchParams();
  const cariFilm = cari.get("carifilm");

  const theme = useSelector((state) => state.theme.theme);
  const dispatchRedux = useDispatch();

  const [movies, setMovies] = useState();
  const [topRated, setTopRated] = useState();
  const [upcoming, setUpcoming] = useState();
  const [NowPlaying, setNowPlaying] = useState();
  const apiKey = "9f7564fd4954a6894fcb509df0584b70"; // Replace with your TMDB API Key

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );

      console.log(response.data); //sudah pasti isinya array
      setMovies(response.data.results);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching the movie data:", error);
    }
  };

  const fetchNowPlaying = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
      );

      console.log(response.data); //sudah pasti isinya array
      setNowPlaying(response.data.results);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching the movie data:", error);
    }
  };

  const fetchTopRated = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
      );

      console.log(response.data); //sudah pasti isinya array
      setTopRated(response.data.results);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching the movie data:", error);
    }
  };

  const fetchUpcoming = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
      );

      console.log(response.data); //sudah pasti isinya array
      setUpcoming(response.data.results);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching the movie data:", error);
    }
  };

  
  useEffect(() => {
    fetchMovies();
    fetchTopRated();
    fetchUpcoming();
    fetchNowPlaying();
  }, [apiKey]);


  const ambilFilm = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING" }); // Start loading
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day",
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjc1NjRmZDQ5NTRhNjg5NGZjYjUwOWRmMDU4NGI3MCIsIm5iZiI6MTcyOTMwNzk0My42MjEyNzcsInN1YiI6IjY3MDQ4ODUyMzIyZDNlYTgzMTFkMzEwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2KzURLDAaxfp6AG1QP6BCL3iwT944pM3oA5V7WHXVE",
          },
        } // Correct endpoint
      );
      dispatch({ type: "FETCH_BERHASIL", payload: response.data.results });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error fetching the film list" });
    }
  })

  const ambilHasilCari = useCallback(async (query) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjc1NjRmZDQ5NTRhNjg5NGZjYjUwOWRmMDU4NGI3MCIsIm5iZiI6MTcyOTMwNzk0My42MjEyNzcsInN1YiI6IjY3MDQ4ODUyMzIyZDNlYTgzMTFkMzEwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2KzURLDAaxfp6AG1QP6BCL3iwT944pM3oA5V7WHXVE",
          },
        }
      );
      dispatch({ type: "SET_FILTER", payload: response.data.results });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error fetching search results",
      });
    }
  })

  const ubahCari = useCallback(
    (input) => {
      setCari({ carifilm: input });
    },
    [setCari]
  );

  useEffect(() => {
    if (cariFilm) {
      ambilHasilCari(cariFilm);
    } else {
      ambilFilm();
    }
  }, [cariFilm]);

  if (state.loading) {
    return <p>Loading...</p>;
  }

  if (state.error) {
    return <p>{state.error}</p>;
  }

  const hasilFilter = cariFilm ? state.filterData : state.data;

  return (
    <BerandaView
      cariFilm={cariFilm}
      hasilFilter={hasilFilter}
      ubahCari={ubahCari}
      upcoming={upcoming}
      topRated={topRated}
      movies={movies}
      NowPlaying={NowPlaying}
    />
  );
};

export default Beranda;
