import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

// Data Dummy Film
const dummyMovies = [
  // Tambahkan film lain jika perlu
];

const Profil = () => {
  const [userRatings, setUserRatings] = useState([]); // Data film yang sudah diberi rating
  const [favorites, setFavorites] = useState([]); // Data film favorit pengguna

  const fetchFavorites = useCallback(
    async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/account/21559322/favorite/movies",
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDQxMWMyMGFiMWJkYjI4OTlmMzkwNjIwZDE1ZWRiMyIsIm5iZiI6MTcyOTMxMjU2OC44NTM0NCwic3ViIjoiNjcwNDgxYjMyMjJlYWQxZWRhYmZmN2E1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.qeZ2k7_EwxoLEWREfpMjbULXda6a8PoZueAd4qjPUnw",
            },
          }
        );
        setFavorites(response.data.results);
      } catch (error) {
        console.error("Error fetching the movie details:", error);
      }
    },
    []
  );

  const fetchRating = useCallback(
    async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/account/21559322/rated/movies",
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDQxMWMyMGFiMWJkYjI4OTlmMzkwNjIwZDE1ZWRiMyIsIm5iZiI6MTcyOTMxMjU2OC44NTM0NCwic3ViIjoiNjcwNDgxYjMyMjJlYWQxZWRhYmZmN2E1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.qeZ2k7_EwxoLEWREfpMjbULXda6a8PoZueAd4qjPUnw",
            },
          }
        );
        setUserRatings(response.data.results);
      } catch (error) {
        console.error("Error fetching the movie details:", error);
      }
    },
    []
  );

  const DeleteRating = async (id) => {
    try {
      const response = await axios.delete(
        `https://api.themoviedb.org/3/movie/${id}/rating`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDQxMWMyMGFiMWJkYjI4OTlmMzkwNjIwZDE1ZWRiMyIsIm5iZiI6MTcyOTMxMjU2OC44NTM0NCwic3ViIjoiNjcwNDgxYjMyMjJlYWQxZWRhYmZmN2E1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.qeZ2k7_EwxoLEWREfpMjbULXda6a8PoZueAd4qjPUnw",
          },
        }
      );
      if (response.data.status_code === 13) {
        alert("Berhasil dihapus dari rating");
      }
    } catch (error) {
      console.error("Error deleting the rating:", error);
    }
  };

  useEffect(() => {
    fetchRating();
    fetchFavorites();
  }, [fetchFavorites, fetchRating]);

  return (
    <div className="min-h-screen bg-rose-900 text-white dark:bg-white dark:text-black">

      {/* Bagian Daftar Rating Film */}
      <div className="p-5">
        <h2 className="text-lg font-semibold mb-3">Rating saya</h2>
        <div className="space-y-4">
          {userRatings.map((movie) => (
            <div
              key={movie.id}
              className="flex bg-white text-black dark:bg-rose-900 dark:text-white p-4 rounded-lg shadow-md"
            >
              {/* Poster Film */}
              <div className="w-1/6">
                <img
                  src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Detail Film */}
              <div className="ml-4 w-5/6">
                <h3 className="text-xl font-bold">{movie.title}</h3>
                <p className="text-sm text-gray-400">{movie.dateRated}</p>
                <p className="mt-2 text-sm text-gray-300">
                  {movie.description}
                </p>
                <div>
              <h3 className="text-lg font-semibold">Kilasan Singkat</h3>
              <p className="text-black dark:text-white">{movie.overview}</p>
            </div>
                <div className="mt-3 flex items-center space-x-2">
                  <span className="bg-yellow-300 text-sm px-3 py-1 rounded-lg">
                    {movie.rating}% Rating Film
                  </span>

                  {/* Tombol Tambah/Hapus Favorit */}
                  <button
                    className="ml-auto text-sm px-3 py-1 rounded-lg bg-red-500"
                    onClick={() => DeleteRating(movie?.id)}
                  >
                    Delete rating
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian Daftar Film Favorit */}
      <div className="p-5">
        <h2 className="text-lg font-semibold mb-3">Film Favorit Saya</h2>
        {favorites.length > 0 ? (
          <div className="space-y-4">
            {favorites.map((movie) => (
              <div
                key={movie.id}
                className="flex bg-slate-50 text-black dark:bg-rose-900 dark:text-whitep-4 rounded-lg shadow-md"
              >
                <div className="w-1/6">
                  <img
                    src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
                    alt={movie.title}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="ml-4 w-5/6">
                  <h3 className="text-xl font-bold">{movie.title}</h3>
                  <div>
              <h3 className="text-lg font-semibold">Kilasan Singkat</h3>
              <p className="text-gray-500">{movie.overview}</p>
            </div>
                  <p className="text-sm text-gray-400">{movie.dateRated}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Belum ada film favorit yang disimpan.</p>
        )}
      </div>
    </div>
  );
};

export default Profil;
