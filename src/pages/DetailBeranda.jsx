import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { CardsMv } from "../components/CardsMv";

const Detail = ({ topRated }) => {
  const [movieData, setMovieData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const TopRated = useSelector((state) => state.film);
  const apiKey = "9f7564fd4954a6894fcb509df0584b7";

  const Favorite = async (id) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/21559322/favorite`,
        { media_type: "movie", media_id: id, favorite: true },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjc1NjRmZDQ5NTRhNjg5NGZjYjUwOWRmMDU4NGI3MCIsIm5iZiI6MTcyOTMwNzk0My42MjEyNzcsInN1YiI6IjY3MDQ4ODUyMzIyZDNlYTgzMTFkMzEwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2KzURLDAaxfp6AG1QP6BCL3iwT944pM3oA5V7WHXVE",
          },
        }
      );
      if (response.data.status_code === 1) {
        alert("Berhasil ditambahkan ke favorite");
      }
    } catch (error) {
      console.error("Error fetching the movie details:", error);
    }
  };

  const Rating = async (id, rating) => {
    console.log("Test, id : " + id + " rating : " + rating);
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${apiKey}`,
        { value: rating },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDQxMWMyMGFiMWJkYjI4OTlmMzkwNjIwZDE1ZWRiMyIsIm5iZiI6MTcyOTMxMjU2OC44NTM0NCwic3ViIjoiNjcwNDgxYjMyMjJlYWQxZWRhYmZmN2E1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.qeZ2k7_EwxoLEWREfpMjbULXda6a8PoZueAd4qjPUnw",
          },
        }
      );
      console.log(response.data);
      if (response.data.status_code === 1) {
        alert("Rating berhasil ditambahkan");
      }
    } catch (error) {
      console.error("Error fetching the movie details:", error);
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjc1NjRmZDQ5NTRhNjg5NGZjYjUwOWRmMDU4NGI3MCIsIm5iZiI6MTcyOTMwNzk0My42MjEyNzcsInN1YiI6IjY3MDQ4ODUyMzIyZDNlYTgzMTFkMzEwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2KzURLDAaxfp6AG1QP6BCL3iwT944pM3oA5V7WHXVE",
            },
          }
        );
        setMovieData(response.data);
      } catch (error) {
        console.error("Error fetching the movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id, apiKey]);

  if (!movieData) return <div>Loading...</div>;

  return (
    <div className="bg-rose-900 text-white dark:bg-white dark:text-black min-h-screen flex items-center justify-center py-10">
      <div className="max-w-4xl w-full p-5 bg-white dark:bg-rose-900 dark:text-white text-black rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          {/* Poster Image with Link */}
          <div className="w-full md:w-1/3">
            <a
              href={`https://www.themoviedb.org/movie/${movieData.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                alt={movieData.title}
                className="w-full h-auto rounded-lg"
              />
            </a>
          </div>

          {/* Movie Info */}
          <div className="w-full md:w-2/3 space-y-3">
            <div className="flex justify-between items-start">
              <h2 className="text-4xl font-bold">
                {movieData.title} ({movieData.release_date?.substring(0, 4)})
              </h2>
              <span className="bg-green-500 px-3 py-1 rounded-lg text-sm font-bold">
                {Math.round(movieData.vote_average * 10)}% Skor Pengguna
              </span>
            </div>
            <p className="text-sm text-gray-400">
              {movieData.genres?.map((genre) => genre.name).join(", ")}
            </p>

            <p className="text-gray-300 italic">"{movieData.tagline}"</p>

            <div>
              <h3 className="text-lg font-semibold">Kilasan Singkat</h3>
              <p className="text-gray-400">{movieData.overview}</p>
            </div>

            <a
              href={`https://www.themoviedb.org/movie/${movieData.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-red-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mt-3">
                Now Streaming - Watch Now
              </button>
            </a>

            {/* Tombol Rating */}
            <div className="mt-5">
              <h3 className="text-lg font-semibold">Beri Rating:</h3>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rate) => (
                <button
                  key={rate}
                  value={rate}
                  onClick={() => Rating(movieData.id, rate)}
                  className="px-1 "
                >
                  <FontAwesomeIcon icon={faStar} />
                </button>
              ))}
            </div>

            {/* Tombol Favorit */}
            <div className="mt-3">
              <button
                onClick={() => handleFavorite()}
                className="px-4 py-2 rounded-lg bg-red-500"
              >
                <svg
                  className="w-6 h-6 text-red-300 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
