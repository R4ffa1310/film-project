import React, { useState } from "react";
import { CardsMv } from "../components/CardsMv";

import { Link } from "react-router-dom";

const BerandaView = ({
  ubahCari,
  cariFilm,
  hasilFilter,
  upcoming,
  topRated,
  movies,
  NowPlaying,
}) => {
  const [inputValue, setInputValue] = useState(cariFilm || "");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // Update local state for input field
    ubahCari(value); // Trigger search
  };

  return (
    <div className="bg-white text-black dark:bg-rose-900 dark:text-white">
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full brightness-75">
          <img
            src={"https://image.tmdb.org/t/p/original" + NowPlaying[0]?.backdrop_path}
          />
          <div className="absolute left-5 right-5 top-1/2 ">
            <h1 className="text-white text-3xl font-bold">{NowPlaying[0]?.title}</h1>
          </div>
        </div>
      </div>
      ;{/* Search Input */}
      <div className="flex justify-cente py-4">
        <label className="input w-full mx-12 input-bordered bg-rose-900 dark:bg-white flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            onChange={(e) => ubahCari(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      {/* Search Results Information */}
      {cariFilm && (
        <>
          <p>
            Hasil dari: {cariFilm}, ditemukan: {hasilFilter.length || 0}
          </p>

          <div className="Card flex w-full overflow-x-auto gap-4">
            {hasilFilter?.map((item, index) => (
              <Link to={"/DetailBeranda/" + item.id} key={index}>
                <CardsMv
                  title={item.title}
                  releaseDate={item.release_date}
                  rating={item.vote_average}
                  img={"https://image.tmdb.org/t/p/original" + item.poster_path}
                />
              </Link>
            ))}
          </div>
        </>
      )}
      {/* Movie Cards Display */}
      <h2 className="font-bold text-3xl p-4 dark:text-white"> Trending </h2>
      <div className="Card flex w-full overflow-x-auto gap-4">
        {movies?.map((item, index) => (
          <Link to={"/DetailBeranda/" + item.id} key={index}>
            <CardsMv
              title={item.title}
              releaseDate={item.release_date}
              rating={item.vote_average}
              img={"https://image.tmdb.org/t/p/original" + item.poster_path}
            />
          </Link>
        ))}
      </div>
      <h2 className="font-bold text-3xl p-4 dark:text-white">Top Rated</h2>
      <div className="Card flex w-full overflow-x-auto gap-4">
        {topRated?.map((item, index) => (
          <Link to={"/DetailBeranda/" + item.id} key={index}>
            <CardsMv
              title={item.title}
              releaseDate={item.release_date}
              rating={item.vote_average}
              img={"https://image.tmdb.org/t/p/original" + item.poster_path}
            />
          </Link>
        ))}
      </div>
      <h2 className="font-bold text-3xl p-4 dark:text-white">Now Playing</h2>
      <div className="Card flex w-full overflow-x-auto gap-4">
        {NowPlaying?.map((item, index) => (
          <Link to={"/DetailBeranda/" + item.id} key={index}>
            <CardsMv
              title={item.title}
              releaseDate={item.release_date}
              rating={item.vote_average}
              img={"https://image.tmdb.org/t/p/original" + item.poster_path}
            />
          </Link>
        ))}
      </div>
      <h2 className="font-bold text-3xl p-4 dark:text-white">Up comming</h2>
      <div className="Card flex w-full overflow-x-auto gap-4">
        {upcoming?.map((item, index) => (
          <Link to={"/DetailBeranda/" + item.id} key={index}>
            <CardsMv
              title={item.title}
              releaseDate={item.release_date}
              rating={item.vote_average}
              img={"https://image.tmdb.org/t/p/original" + item.poster_path}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BerandaView;
